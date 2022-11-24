from lecture.models import Lecture
from rest_framework import generics, status
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema_view, extend_schema
from enrollment.models import Enrollment
from enrollment.serializers import EnrollmentSerializer
from rest_framework.exceptions import NotAuthenticated, PermissionDenied
from backend.exceptions import BadRequestError, InternalServerError


@extend_schema_view(
    list=[
        extend_schema(
            description='Get all enrollment information of user',
            methods=['GET'],
            responses={
                200: EnrollmentSerializer(many=True),
            },
        ),
        extend_schema(
            description='Create a user enrollment information',
            methods=['POST'],
            responses={
                201: EnrollmentSerializer,
                401: None,
            },
        ),
    ],
)
class EnrollmentListOrCreate(generics.ListCreateAPIView):
    serializer_class = EnrollmentSerializer
    lookup_field = 'lecture_id'

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            raise NotAuthenticated

        return Enrollment.objects.filter(student=user).all()

    def perform_create(self, serializer):
        try:
            lecture_id = self.request.data.get(self.lookup_field)
            lecture = Lecture.objects.get(pk=lecture_id)
        except Lecture.DoesNotExist as e:
            raise BadRequestError(detail=e)
        except Lecture.MultipleObjectsReturned as e:
            raise InternalServerError(detail=e)

        user = self.request.user
        if Enrollment.objects.filter(lecture=lecture, student=user).exists():
            raise BadRequestError(detail='already enrolled user')
        if lecture.instructor == user:
            raise BadRequestError(detail='instructor cannot be enrolled')

        return serializer.save(student=user, lecture=lecture)


@extend_schema_view(
    list=[
        extend_schema(
            description='Get a enrollment information associated with user',
            methods=['GET'],
            responses={
                200: EnrollmentSerializer,
            },
        ),
        extend_schema(
            description='Delete a lecture when user is an instructor',
            methods=['DELETE'],
            responses={
                204: None,
                401: None,
            },
        ),
    ]
)
class EnrollmentRetrieveOrDestroy(generics.RetrieveDestroyAPIView):
    serializer_class = EnrollmentSerializer
    lookup_field = 'enrollment_id'

    def get_object(self):
        enrollment_id = self.kwargs.get(self.lookup_field)
        try:
            enrollment = Enrollment.objects.get(pk=enrollment_id)
        except Enrollment.DoesNotExist as e:
            raise BadRequestError(detail=e)
        except Enrollment.MultipleObjectsReturned as e:
            raise InternalServerError(detail=e)

        if not enrollment.student == self.request.user:
            raise PermissionDenied

        return enrollment

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()

        try:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Enrollment.DoesNotExist as e:
            raise BadRequestError(detail=e)
        except Enrollment.MultipleObjectsReturned as e:
            raise InternalServerError(detail=e)
