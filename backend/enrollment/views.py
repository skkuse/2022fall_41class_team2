from http.client import INTERNAL_SERVER_ERROR
from rest_framework.exceptions import ParseError
from lecture.models import Lecture
from rest_framework import generics, status
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema_view, extend_schema
from enrollment.models import Enrollment
from enrollment.serializers import EnrollmentSerializer
from authentication.models import User
from rest_framework.exceptions import PermissionDenied


@extend_schema_view(
    list=[
        extend_schema(
            description='Get all enrollment information of user',
            methods=['GET'],
            request=None,
            responses={
                200: EnrollmentSerializer(many=True),
            },
        ),
        extend_schema(
            description='Create a user enrollment information',
            methods=['POST'],
            request=EnrollmentSerializer,
            responses={
                201: EnrollmentSerializer,
                401: None,
            },
        ),
    ],
)
class EnrollmentListOrCreate(generics.ListCreateAPIView):
    serializer_class = EnrollmentSerializer
    query_param_name = 'oauth_id'

    def get_queryset(self):
        user = self.request.user
        if len(Enrollment.objects.filter(student=user)) == 0:
            raise PermissionDenied
        else:
            return Enrollment.objects.filter(student=user)

    def perform_create(self, serializer):
        user = self.request.user
        student_id = self.request.data.get('student')
        lecture_id = self.request.data.get('lecture')
        student = User.objects.get(pk=student_id)
        lecture = Lecture.objects.get(pk=lecture_id)
        if student == user:
            return serializer.save(student=student, lecture=lecture)
        else:
            raise PermissionDenied


@extend_schema_view(
    list=[
        extend_schema(
            description='Get a enrollment information associated with user',
            methods=['GET'],
            request=None,
            responses={
                200: EnrollmentSerializer,
            },
        ),
        extend_schema(
            description='Delete a lecture when user is an instructor',
            methods=['DELETE'],
            request='user_auth',
            responses={
                204: None,
                401: None,
            },
        ),
    ]
)
class EnrollmentRetrieveOrDestroy(generics.RetrieveDestroyAPIView):
    lookup_field = 'enrollment_id'
    serializer_class = EnrollmentSerializer
    queryset = Enrollment.objects.all()

    def get_object(self):
        user = self.request.user
        try:
            enrollment_id = self.kwargs.get(self.lookup_field)
            enrollment = Enrollment.objects.get(pk=enrollment_id)
            if enrollment.student == user:
                return enrollment
            else:
                return PermissionDenied
        except Enrollment.DoesNotExist:
            raise ParseError
        except Enrollment.MultipleObjectsReturned:
            raise INTERNAL_SERVER_ERROR

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()

        try:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Enrollment.DoesNotExist:
            raise ParseError
        except Enrollment.MultipleObjectsReturned:
            raise INTERNAL_SERVER_ERROR
