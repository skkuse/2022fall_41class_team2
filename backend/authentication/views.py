import os

from rest_framework import status, fields
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import APIException

from drf_spectacular.utils import extend_schema, OpenApiParameter, inline_serializer

from authentication.utils import handle_get, handle_post, get_tokens_for_user
from authentication.models import User
from authentication.serializers import UserSerializer

BASE_URI = 'http://localhost:8000/'
GITHUB_CALLBACK_URI = 'http://localhost:8000/auth/github/callback/'


@extend_schema(
    description='Get a User Details',
    request=None,
    responses={
        200: UserSerializer,
    },
)
@api_view(['GET'])
def user_detail(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if not user.__eq__(request.user):
        raise APIException(detail='Authentication is not matched', code=status.HTTP_401_UNAUTHORIZED)

    serializer = UserSerializer(user)
    return Response(serializer.data)


@extend_schema(
    description='OAuth 2.0 Github Callback',
    parameters=[
        OpenApiParameter(name='code', required=True, type=str),
    ],
    request=None,
    responses={
        200: inline_serializer(
            name='user_auth',
            fields={
                'user_id': fields.CharField(),
                'access': fields.CharField(),
                'refresh': fields.CharField(),
            },
        ),
    },
)
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def github_callback(request):
    client_id = os.environ['GITHUB_CLIENT_ID']
    client_secret = os.environ['GITHUB_CLIENT_SECRET']
    code = request.GET.get('code')

    token_response = handle_post(
        f'https://github.com/login/oauth/access_token?client_id={client_id}&client_secret={client_secret}&code={code}&accept=&json&redirect_uri={GITHUB_CALLBACK_URI}&response_type=code',
        headers={'Accept': 'application/json'},
    )
    access_token = token_response.get('access_token')

    profile_response = handle_get(
        f'https://api.github.com/user',
        headers={'Authorization': f'Bearer {access_token}'},
    )

    user = User.objects.update_or_create_user(
        email=profile_response.get('email'),
        nickname=profile_response.get('login'),
        name=profile_response.get('name'),
        profile_image_url=profile_response.get('avatar_url'),
        github_api_url=profile_response.get('url'),
    )
    tokens = get_tokens_for_user(user=user)

    return Response({
        'user_id': user.id,
        'access': tokens[0],
        'refresh': tokens[1],
    })