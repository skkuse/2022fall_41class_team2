from types import NoneType
from django.shortcuts import render
from drf_spectacular.utils import extend_schema_view, extend_schema
from assignment.models import Assignment
from assignment.serializers import AssignmentSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response


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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

    def perform_create(self, serializer):
        serializer.save(instructor = self.request.user)

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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

