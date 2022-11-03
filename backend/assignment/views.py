from django.shortcuts import render
from drf_spectacular.utils import extend_schema, extend_schema_view
from lecture.models import Lecture
from rest_framework import generics, permissions, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from assignment.models import Assignment
from assignment.serializers import AssignmentSerializer


@extend_schema_view(
    list=[
        extend_schema(
            description='Get all Assignment information of a specific lecture',
            methods=['GET'],
            request=None,
            responses={200: AssignmentSerializer(many=True)},
        ),
        extend_schema(
            description='Create a new Assignment',
            methods=['POST'],
            request=AssignmentSerializer,
            responses={
                201: AssignmentSerializer,
                401: None,
            },
        ),
    ]
)
class AssignmentListOrCreate(generics.ListCreateAPIView):
    serializer_class = AssignmentSerializer
    query_param_name = 'lecture_id'

    def get_queryset(self):
        lecture_id = self.request.query_params.get(self.query_param_name)
        return Assignment.objects.filter(lecture_id=lecture_id).all()

    def perform_create(self, serializer):
        lecture_id = self.request.data.get('lecture_id')
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
            request=None,
            responses={200: AssignmentSerializer},
        ),
        extend_schema(
            description='Delete Assignment',
            methods=['DELETE'],
            request='user_auth',
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
        assignment_id = self.kwargs.get(self.lookup_field)
        return Assignment.objects.get(pk=assignment_id)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.lecture.instructor == self.request.user:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise PermissionDenied
