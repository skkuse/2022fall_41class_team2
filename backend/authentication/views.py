import datetime
import os

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import APIException

from authentication.utils import handle_get, handle_post
from authentication.models import User
from authentication.serializers import UserSerializer

BASE_URI = 'http://localhost:8000/'
GITHUB_CALLBACK_URI = 'http://localhost:8000/auth/github/callback/'


@api_view(['GET'])
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if not user.__eq__(request.user):
        raise APIException(detail='Authentication is not matched', code=status.HTTP_401_UNAUTHORIZED)

    serializer = UserSerializer(user)
    return Response(serializer.data)


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
    name = profile_response.get('name')
    email = profile_response.get('email')
    nickname = profile_response.get('login')
    profile_image_url = profile_response.get('avatar_url')
    github_api_url = profile_response.get('url')

    if User.objects.filter(email=email).exists():
        User.objects.update(
            last_login=datetime.datetime.now(),
            name=name,
            profile_image_url=profile_image_url,
            github_api_url=github_api_url,
        )
    else:
        User.objects.create(
            name=name,
            email=email,
            nickname=nickname,
            profile_image_url=profile_image_url,
            github_api_url=github_api_url,
        )

    user = User.objects.get(email=email)
    auth_token = Token.objects.get_or_create(user=user)
    return Response({
        'user_id': user.id,
        'auth_token': auth_token[0].key,
    })
