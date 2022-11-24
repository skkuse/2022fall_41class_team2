from django.db.models import Q
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from backend.exceptions import BadRequestError, InternalServerError
from assignment.models import Assignment
from testcase.models import Testcase
from testcase.serializers import TestcaseSerializer
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiParameter


@extend_schema_view(
    list=[
        extend_schema(
            description='List testcases associated an assignment',
            methods=['GET'],
            responses={
                200: TestcaseSerializer(many=True),
            },
        ),
        extend_schema(
            description='Create a testcase when user is an instructor',
            methods=['POST'],
            responses={
                201: TestcaseSerializer,
                400: None,
                401: None,
                403: None,
                500: None,
            },
        ),
    ]
)
class TestcaseListOrCreate(generics.ListCreateAPIView):
    serializer_class = TestcaseSerializer
    lookup_param_field = 'assignment_id'

    @extend_schema(
        parameters=[
            OpenApiParameter(name=lookup_param_field, required=True, type=int),
        ],
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        user = self.request.user
        assignment_id = self.request.GET.get(self.lookup_param_field)

        if user.is_anonymous:
            return Testcase.objects.filter(
                is_hidden=False,
                assignment_id=assignment_id,
            ).all()

        q = Q()
        q.add(Q(assignment__lecture__instructor=user), q.OR)
        q.add(~Q(assignment__lecture__instructor=user) and Q(is_hidden=False), q.OR)

        return Testcase.objects.filter(
            q,
            assignment_id=assignment_id,
        ).all()

    def perform_create(self, serializer):
        try:
            assignment_id = self.request.data.get(self.lookup_param_field)
            assignment = Assignment.objects.get(pk=assignment_id)
        except Assignment.DoesNotExist as e:
            raise BadRequestError(detail=e)
        except Assignment.MultipleObjectsReturned as e:
            raise InternalServerError(detail=e)

        if assignment.lecture.instructor == self.request.user:
            return serializer.save()
        else:
            raise PermissionDenied


@extend_schema_view(
    list=[
        extend_schema(
            description='Retrieve a testcase associated user and hidden info',
            methods=['GET'],
            responses={
                200: TestcaseSerializer,
                400: None,
                403: None,
                500: None,
            },
        ),
        extend_schema(
            description='Destroy a testcase when user is an instructor',
            methods=['POST'],
            responses={
                204: None,
                401: None,
                403: None,
            },
        ),
    ]
)
class TestcaseRetrieveOrDestroy(generics.RetrieveDestroyAPIView):
    serializer_class = TestcaseSerializer
    lookup_field = 'testcase_id'

    def get_object(self):
        try:
            testcase_id = self.kwargs.get(self.lookup_field)
            testcase = Testcase.objects.get(pk=testcase_id)
        except Testcase.DoesNotExist as e:
            raise BadRequestError(detail=e)
        except Testcase.MultipleObjectsReturned as e:
            raise InternalServerError(detail=e)

        user = self.request.user
        instructor = testcase.assignment.lecture.instructor

        if testcase.is_hidden and user != instructor:
            raise PermissionDenied

        return testcase

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instructor = instance.assignment.lecture.instructor

        if request.user == instructor:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise PermissionDenied
