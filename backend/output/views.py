from rest_framework import generics, status, fields
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import NotAuthenticated, PermissionDenied, ParseError
from backend.exceptions import InternalServerError
from output.utils_execution import run
from repo.models import Repo
from output.models import Result
from output.serializers import ResultSerializer
from drf_spectacular.utils import extend_schema_view, extend_schema, inline_serializer, OpenApiParameter


MAX_RESULT_NUM = 3


@extend_schema(
    description='Retrieve the output of exercise',
    methods=['POST'],
    request=inline_serializer(
        name='request_output_exercises',
        fields={
            'language': fields.CharField(),
            'content': fields.CharField(),
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

    result = run(
        language=language,
        raw_code=raw_code,
        raw_input=raw_input,
    )
    return Response(
        data=result,
        status=status.HTTP_200_OK,
    )


@extend_schema_view(
    list=[
        extend_schema(
            description='Retrieve a result associated user and assignment',
            responses={
                200: ResultSerializer(many=True),
                401: None,
            },
        ),
        extend_schema(
            description='Create a result associated user and repo, this request is same as assignment submission',
            responses={
                201: ResultSerializer,
                401: None,
                403: None,
                500: None,
            }
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

    def post(self, request, *args, **kwargs):
        try:
            repo_id = self.request.data.get('repo_id')
            repo = Repo.objects.get(pk=repo_id)
        except Repo.DoesNotExist:
            raise ParseError
        except Repo.MultipleObjectsReturned:
            raise InternalServerError

        user = self.request.user
        if repo.author != user:
            raise PermissionDenied

        # TODO repo content update

        if Result.objects.filter(
            repo__assignment=repo.assignment,
            repo__author=user,
        ).count() >= MAX_RESULT_NUM:
            raise ParseError(detail="Submission could not be over 3 times.")

        result = super().create(request, *args, **kwargs)

        # TODO create 4 sub-results

        return result
