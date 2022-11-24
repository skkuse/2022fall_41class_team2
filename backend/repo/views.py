from rest_framework import generics
from rest_framework.exceptions import NotAuthenticated, PermissionDenied
from backend.exceptions import BadRequestError, InternalServerError
from assignment.models import Assignment
from repo.models import Repo
from repo.serializers import RepoSerializer
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiParameter

MAX_REPO = 3


@extend_schema_view(
    list=[
        extend_schema(
            description='List repos associated user',
            methods=['GET'],
            responses={
                200: RepoSerializer(many=True),
                401: None,
            },
        ),
        extend_schema(
            description='Create a repo',
            methods=['POST'],
            responses={
                201: RepoSerializer,
                400: None,
                500: None,
            },
        )
    ]
)
class RepoListOrCreate(generics.ListCreateAPIView):
    serializer_class = RepoSerializer
    lookup_param_field = 'assignment_id'
    langauge_field = 'language'
    code_field = 'code'

    @extend_schema(
        parameters=[
            OpenApiParameter(name='assignment_id', required=True, type=int),
        ],
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
            assignment_id = request.data.get(self.lookup_param_field)
            assignment = Assignment.objects.get(pk=assignment_id)
        except Assignment.DoesNotExist as e:
            raise BadRequestError(detail=e)
        except Assignment.MultipleObjectsReturned as e:
            raise InternalServerError(detail=e)

        num_repo = Repo.objects.filter(
            author=request.user,
            assignment=assignment,
        ).count()

        if num_repo < MAX_REPO:
            return super().create(request=request, *args, **kwargs)
        else:
            raise BadRequestError(detail=f'Repo cannot be more than {MAX_REPO} instances.')

    def get_queryset(self):
        assignment_id = self.request.GET.get(self.lookup_param_field)
        user = self.request.user
        if user.is_anonymous:
            raise NotAuthenticated

        return Repo.objects.filter(
            author_id=user.id,
            assignment_id=assignment_id,
        )

    def perform_create(self, serializer):
        data = serializer.validated_data
        language = data.pop(self.langauge_field)
        code = data.pop(self.code_field)

        return serializer.save(
            author=self.request.user,
            content=dict({
                self.langauge_field: language,
                self.code_field: code,
            }),
        )


@extend_schema_view(
    list=[
        extend_schema(
            description='Retrieve a repo',
            methods=['GET'],
            responses={
                200: RepoSerializer,
                400: None,
                401: None,
                403: None,
                500: None,
            },
        ),
        extend_schema(
            description='Update a repo',
            methods=['PUT'],
            responses={
                200: RepoSerializer,
                400: None,
                403: None,
                500: None,
            },
        ),
        extend_schema(
            description='Delete a repo',
            methods=['DELETE'],
            responses={
                204: None,
            },
        )
    ]
)
class RepoRetrieveOrUpdateOrDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RepoSerializer
    lookup_field = 'repo_id'
    langauge_field = 'language'
    code_field = 'code'

    def get_object(self):
        try:
            repo_id = self.kwargs.get(self.lookup_field)
            repo = Repo.objects.get(pk=repo_id)
        except Repo.DoesNotExist as e:
            raise BadRequestError(detail=e)
        except Repo.MultipleObjectsReturned as e:
            raise InternalServerError(detail=e)

        user = self.request.user
        if user.is_anonymous:
            raise NotAuthenticated

        author = repo.author
        if user != author:
            raise PermissionDenied

        return repo

    def perform_update(self, serializer):
        data = serializer.validated_data
        language = data.pop(self.langauge_field)
        code = data.pop(self.code_field)

        return serializer.save(
            content=dict({
                self.langauge_field: language,
                self.code_field: code,
            }),
        )

    @extend_schema(exclude=True)
    def patch(self, request, *args, **kwargs): pass
