import requests
from rest_framework_simplejwt.tokens import RefreshToken
from backend.exceptions import InternalServerError


def handle_request(method, url=None, **kwargs):
    response = requests.request(method, url, **kwargs)
    if not response.ok:
        raise InternalServerError(detail=response.reason)

    content = response.json()
    if content.get('error') is not None:
        raise InternalServerError(detail=content.get('error'))

    return content


def handle_get(url, params=None, **kwargs):
    return handle_request('get', url, params=params, **kwargs)


def handle_post(url, data=None, json=None, **kwargs):
    return handle_request('post', url, data=data, json=json, **kwargs)


def get_tokens_for_user(user):
    refresh_token = RefreshToken.for_user(user)
    return (
        str(refresh_token.access_token),
        str(refresh_token)
    )
