from types import NoneType

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
            description = 'Get all Assignment information of a specific lecture',
            methods = ['GET'],
            request = 'user_auth',
            responses = {200: AssignmentSerializer(many = True)},
        ),
        extend_schema(
            description='Create a new Assignment',
            methods = ['POST'],
            request = AssignmentSerializer,
            responses = {
                201: AssignmentSerializer,
                401: None,
            },
        ),
    ]
)

class AssignmentListOrCreate(generics.ListCreateAPIView):
    serializer_class = AssignmentSerializer

    def get_queryset(self):
        lecture_id = self.request.data.get('lecture_id')
        return Assignment.objects.filter(lecture_id = lecture_id).all()

    def perform_create(self, serializer):
        lecture_id = self.request.data.get('lecture_id')
        lecture = Lecture.objects.get(pk = lecture_id)
        if(lecture.instructor == self.request.user):
            serializer.save(lecture = lecture)
        else:
            raise PermissionDenied


@extend_schema_view(
    list=[
        extend_schema(
            description = 'Get Assignment information',
            methods = ['GET'],
            request = None,
            responses = {200: AssignmentSerializer},
        ),
        extend_schema(
            description = 'Delete Assignment',
            methods = ['DELETE'],
            request = 'user_auth',
            responses = {
                204: None,
                401: None
            },
        ),
    ]
)


class AssignmentRetrieveOrDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AssignmentSerializer

    def get_queryset(self):
        lecture_id = self.request.data.get('lecture_id')
        return Assignment.objects.filter(lecture_id = lecture_id).all()

    def get_object(self):
        lecture_id = self.request.data.get('lecture_id')
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(pk = Assignment.objects.get(lecture_id = lecture_id))
        self.check_object_permissions(self.request.obj)
        return obj

    def perform_destroy(self, serializer):
        lecture_id = self.request.data.get('lecture_id')
        lecture = Lecture.objects.get(pk = lecture_id)
        if(lecture.instructor == self.request.user):
            return serializer.delete(lecture = lecture)
        else:
            raise PermissionDenied


