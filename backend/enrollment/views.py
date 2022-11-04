from rest_framework import generics, status
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema_view, extend_schema
from enrollment.models import Enrollment
from enrollment.serializers import EnrollmentSerializer


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

    """
    @seungho
    You should not just return all enrollment instances
    Please filter by lecture_id
    """
    def get_queryset(self):
        # return Enrollment.objects.all()
        return None

    def perform_create(self, serializer):
        return serializer.save()


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
            request=None,
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

    def get_object(self):
        enrollment_id = self.kwargs.get(self.lookup_field)
        return Enrollment.objects.get(pk=enrollment_id)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
