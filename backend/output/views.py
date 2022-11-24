import os

from pathlib import Path
from rest_framework import generics, status, fields
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import NotAuthenticated, PermissionDenied, ParseError
from backend.exceptions import InternalServerError
from output import utils_execution, utils_code_explain, utils_functionality, utils_readability, utils_efficiency, utils_plagiarism
from testcase.models import Testcase
from repo.models import Repo
from output.models import Result
from output.serializers import ResultSerializer, TestcaseResultSerializer
from drf_spectacular.utils import extend_schema_view, extend_schema, inline_serializer, OpenApiParameter
from backend.settings.base import BASE_DIR, TESTING

SERVER_CODE_DIR = str(BASE_DIR) + os.environ['SERVER_CODE_DIR'] if not TESTING else str(BASE_DIR) + '/temp/'
MAX_RESULT_NUM = 3


@extend_schema(
    description='Retrieve the output of exercise',
    methods=['POST'],
    request=inline_serializer(
        name='request_output_exercises',
        fields={
            'language': fields.CharField(),
            'code': fields.CharField(),
            'input': fields.CharField(),
        },
    ),
    responses={
        200: inline_serializer(
            name='response_output_exercises',
            fields={
                'exit_status': fields.IntegerField(),
                'output': fields.CharField(),
            },
        ),
    },
)
@api_view(['POST'])
def retrieve_exercise_output(request):
    data = request.data
    language = data.get('language')
    raw_code = data.get('code')
    raw_input = data.get('input')

    result = utils_execution.run(
        base_dir=SERVER_CODE_DIR,
        language=language,
        raw_code=raw_code,
        raw_input=raw_input,
    )
    return Response(
        data=result,
        status=status.HTTP_200_OK,
    )


@extend_schema(
    description='Retrieve the output of testcase',
    methods=['POST'],
    request=inline_serializer(
        name='request_output_testcase',
        fields={
            'language': fields.CharField(),
            'code': fields.CharField(),
        },
    ),
    responses={
        200: TestcaseResultSerializer,
        400: None,
        500: None,
    },
)
@api_view(['POST'])
def retrieve_testcase_output(request, testcase_id):
    language = request.data.get('language')
    raw_code = request.data.get('code')

    try:
        testcase = Testcase.objects.get(pk=testcase_id)
    except Testcase.DoesNotExist:
        raise ParseError
    except Testcase.MultipleObjectsReturned:
        raise InternalServerError

    if testcase.is_hidden:
        raise ParseError("Hidden testcase cannot be executed explicitly")

    ret = utils_execution.run(
        base_dir=SERVER_CODE_DIR,
        language=language,
        raw_code=raw_code,
        raw_input=testcase.input,
    )
    if ret.get('exit_status') == 0:
        actual_output = ret.get('output')
        is_error = False
        is_pass = (actual_output == testcase.output)
    else:
        actual_output = None
        is_error = True
        is_pass = False

    return Response(
        data=TestcaseResultSerializer(instance={
            'is_hidden': testcase.is_hidden,
            'input': testcase.input,
            'is_error': is_error,
            'expected_output': testcase.output,
            'actual_output': actual_output,
            'is_pass': is_pass,
        }).data,
        status=status.HTTP_200_OK,
    )


@extend_schema_view(
    list=[
        extend_schema(
            description='Retrieve a result associated user and assignment',
            methods=['GET'],
            responses={
                200: ResultSerializer(many=True),
                401: None,
            },
        ),
        extend_schema(
            description='Create a result associated user and repo, this request is same as assignment submission',
            methods=['POST'],
            responses={
                201: ResultSerializer,
                401: None,
                403: None,
                500: None,
            },
        ),
    ]
)
class ResultListOrCreate(generics.ListCreateAPIView):
    serializer_class = ResultSerializer

    @extend_schema(
        parameters=[
            OpenApiParameter(name='assignment_id', required=True, type=int),
        ]
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        assignment_id = self.request.GET.get('assignment_id')
        user = self.request.user
        if user.is_anonymous:
            raise NotAuthenticated

        return Result.objects.filter(
            repo__assignment_id=assignment_id,
            repo__author_id=user.id,
        ).all()

    @extend_schema(
        request=inline_serializer(
            name='request_output_results',
            fields={
                'repo_id': fields.IntegerField(),
                'language': fields.CharField(),
                'code': fields.CharField(),
            },
        ),
    )
    def post(self, request, *args, **kwargs):
        repo_id = request.data.get('repo_id')
        language = request.data.get('language')
        raw_code = request.data.get('code')

        try:
            repo = Repo.objects.get(pk=repo_id)
        except Repo.DoesNotExist:
            raise ParseError
        except Repo.MultipleObjectsReturned:
            raise InternalServerError

        # Get necessary instances
        user = self.request.user
        assignment = repo.assignment
        testcases = Testcase.objects.filter(assignment=assignment).all()
        sample_testcase = testcases.first()

        if repo.author != user:
            raise PermissionDenied

        if Result.objects.filter(
            repo__assignment=assignment,
            repo__author=user,
        ).count() >= MAX_RESULT_NUM:
            raise ParseError(detail="Submission could not be over 3 times.")

        # When code is non-executable just return result instance
        if utils_execution.run(
            base_dir=SERVER_CODE_DIR,
            language=language,
            raw_code=raw_code,
            raw_input=sample_testcase.input,
        ).get('exit_status') != 0:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            result = serializer.save()
            return Response(
                data=ResultSerializer(instance=result).data,
                status=status.HTTP_201_CREATED,
            )

        # Make directory and file dynamically to calling external library
        base_dir = f'{SERVER_CODE_DIR}{assignment.id}/{language}/'
        Path(base_dir).mkdir(parents=True, exist_ok=True)
        [filename] = utils_execution.make_arguments(
            base_dir=base_dir,
            language=language,
            raw_code=raw_code,
        )
        full_filename = base_dir + filename

        # Run Code Description Module
        code_description = utils_code_explain.run(
            raw_code=raw_code,
        )
        data = request.data
        data.update({'code_description': code_description})

        # Save init result object
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = serializer.save()

        # Run Functionality Module
        utils_functionality.run(
            result_id=result.id,
            testcases=testcases,
            base_dir=base_dir,
            language=language,
            raw_code=raw_code,
        )

        # Run Readability Module
        utils_readability.run(
            result_id=result.id,
            full_filename=full_filename,
        )

        # Run Efficiency Module
        utils_efficiency.run(
            result_id=result.id,
            full_filename=full_filename,
        )

        # Run Plagiarism Module
        utils_plagiarism.run(
            result_id=result.id,
            full_filename=full_filename,
            test_dir=base_dir,
            ref_dir=base_dir,
        )

        return Response(
            data=ResultSerializer(instance=result).data,
            status=status.HTTP_201_CREATED,
        )


@extend_schema(
    description='Retrieve a result',
    methods=['GET'],
    responses={
        200: ResultSerializer,
        400: None,
        403: None,
        500: None,
    },
)
class ResultRetrieve(generics.RetrieveAPIView):
    serializer_class = ResultSerializer
    lookup_field = 'result_id'

    def get_object(self):
        try:
            result_id = self.kwargs.get(self.lookup_field)
            result = Result.objects.get(pk=result_id)
        except Result.DoesNotExist:
            raise ParseError
        except Result.MultipleObjectsReturned:
            raise InternalServerError

        user = self.request.user
        author = result.repo.author
        if user != author:
            raise PermissionDenied

        return result
