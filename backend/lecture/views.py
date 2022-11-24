from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from drf_spectacular.utils import extend_schema_view, extend_schema
from lecture.models import Lecture
from lecture.serializers import LectureSerializer
from backend.exceptions import InternalServerError


@extend_schema_view(
    list=[
        extend_schema(
            description='List lectures associated with user if exist',
            methods=['GET'],
            responses={
                200: LectureSerializer(many=True),
            },
        ),
        extend_schema(
            description='Create a lecture using user as an instructor',
            methods=['POST'],
            responses={
                201: LectureSerializer,
                401: None,
            },
        ),
    ],
)
class LectureListOrCreate(generics.ListCreateAPIView):
    serializer_class = LectureSerializer

    def get_queryset(self):
        return Lecture.objects.all()

    def perform_create(self, serializer):
        return serializer.save(instructor=self.request.user)


@extend_schema_view(
    list=[
        extend_schema(
            description='Retrieve a lecture associated with user if exist',
            methods=['GET'],
            responses={
                200: LectureSerializer,
                400: None,
                500: None,
            },
        ),
        extend_schema(
            description='Destroy a lecture when user is an instructor',
            methods=['DELETE'],
            responses={
                204: None,
                401: None,
            },
        ),
    ]
)
class LectureRetrieveOrDestroy(generics.RetrieveDestroyAPIView):
    lookup_field = 'lecture_id'
    serializer_class = LectureSerializer

    def get_object(self):
        try:
            lecture_id = self.kwargs.get(self.lookup_field)
            return Lecture.objects.get(pk=lecture_id)
        except Lecture.DoesNotExist:
            raise ParseError
        except Lecture.MultipleObjectsReturned:
            raise InternalServerError

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.instructor == request.user:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
