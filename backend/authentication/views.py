import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from authentication.utils import handle_get, handle_post

BASE_URI = 'http://localhost:8000/'
GITHUB_CALLBACK_URI = 'http://localhost:8000/auth/github/callback/'


@api_view(['GET', 'POST'])
def github_callback(request):
    client_id = os.environ['GITHUB_CLIENT_ID']
    client_secret = os.environ['GITHUB_CLIENT_SECRET']
    code = request.GET.get('code')

    token_response = handle_post(
        f'https://github.com/login/oauth/access_token?client_id={client_id}&client_secret={client_secret}&code={code}&accept=&json&redirect_uri={GITHUB_CALLBACK_URI}&response_type=code',
        headers={'Accept': 'application/json'},
    )
    access_token = token_response.get('access_token')

    info_response = handle_get(
        f'https://api.github.com/user',
        headers={'Authorization': f'Bearer {access_token}'},
    )
    # TODO save user

    return Response({'haha': True})
