from types import NoneType
from django.shortcuts import render
from drf_spectacular.utils import extend_schema_view, extend_schema
from assignment.models import Assignment
from assignment.serializers import AssignmentSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from lecture.models import Lecture
from rest_framework.exceptions import PermissionDenied


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
    # doing .all will fetch all assignments from all lectures -- need to filter
    # need to do some sort of checking with student's enrolled lectures and fetch the appropriate lecture
    # SELECT LECTURE_ID FROM LECTURES WHERE NAME = "YOUR INPUTTED LECTURE NAME";
    # SELECT * FROM ASSIGNMENTS WHERE LECTURE_ID = "THE LECTURE ID FROM PREVIOUS LINE"; 
    # specified_lecture = Lecture.objects.get(name = )
    # queryset = specified_lecture.Assignment_set.all()
    # queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

    def get_queryset(self):
        lecture_id = self.request.data.get('lecture_id')
        print(lecture_id)
        return Assignment.objects.filter(lecture_id = lecture_id).all()

    def perform_create(self, serializer):
        lecture_id = self.request.data.get('lecture_id')
        lecture = Lecture.objects.get(pk = lecture_id)
        print(lecture)
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
    # again doing .all will destroy all assignments from all lectures
    # needs a check 
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

