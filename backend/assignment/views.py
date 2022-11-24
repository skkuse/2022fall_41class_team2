from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiParameter
from lecture.models import Lecture
from rest_framework import generics, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from assignment.models import Assignment
from assignment.serializers import AssignmentSerializer
from backend.exceptions import BadRequestError, InternalServerError


@extend_schema_view(
    list=[
        extend_schema(
            description='Get all Assignment information of a specific lecture',
            methods=['GET'],
            responses={
                200: AssignmentSerializer(many=True)
            },
        ),
        extend_schema(
            description='Create a new Assignment',
            methods=['POST'],
            responses={
                201: AssignmentSerializer,
                401: None,
            },
        ),
    ]
)
class AssignmentListOrCreate(generics.ListCreateAPIView):
    serializer_class = AssignmentSerializer
    lookup_param_field = 'lecture_id'

    @extend_schema(
        parameters=[
            OpenApiParameter(name=lookup_param_field, required=True, type=int),
        ],
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        lecture_id = self.request.query_params.get(self.lookup_param_field)
        return Assignment.objects.filter(lecture_id=lecture_id).all()

    def perform_create(self, serializer):
        lecture_id = self.request.data.get(self.lookup_param_field)
        lecture = Lecture.objects.get(pk=lecture_id)
        if lecture.instructor == self.request.user:
            serializer.save(lecture=lecture)
        else:
            raise PermissionDenied


@extend_schema_view(
    list=[
        extend_schema(
            description='Get Assignment information',
            methods=['GET'],
            responses={
                200: AssignmentSerializer
            },
        ),
        extend_schema(
            description='Delete Assignment',
            methods=['DELETE'],
            responses={
                204: None,
                401: None
            },
        ),
    ]
)
class AssignmentRetrieveOrDestroy(generics.RetrieveDestroyAPIView):
    serializer_class = AssignmentSerializer
    lookup_field = 'assignment_id'
    queryset = Assignment.objects.all()

    def get_object(self):
        try:
            assignment_id = self.kwargs.get(self.lookup_field)
            return Assignment.objects.get(pk=assignment_id)
        except Assignment.DoesNotExist as e:
            raise BadRequestError(detail=e)
        except Assignment.MultipleObjectsReturned as e:
            raise InternalServerError(detail=e)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.lecture.instructor == self.request.user:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise PermissionDenied
