import json
from datetime import datetime, timezone
from unittest.mock import patch
from django.utils import timezone
from django.test import TestCase
from rest_framework.test import APIClient
from authentication.models import User


class Test(TestCase):
    mock_date = datetime(2022, 1, 1, 1, 1, 1, tzinfo=timezone.utc)
    mock_nickname = 'mock-nickname'
    mock_oauth_id = 'mock-oauth-id'
    mock_name = 'mock-name'
    mock_email = 'mock-email@email.com'
    mock_profile_image_url = 'https://mock-profile-image-url.com'
    mock_github_api_url = 'https://mock-github-api-url.com'
    mock_github_profile_url = 'https://mock-github-profile-url.com'

    @patch('django.utils.timezone.now', return_value=mock_date)
    def setUp(self, mock_now) -> None:
        User.objects.create(
            nickname=self.mock_nickname,
            oauth_id=self.mock_oauth_id,
            name=self.mock_name,
            email=self.mock_email,
            profile_image_url=self.mock_profile_image_url,
            github_api_url=self.mock_github_api_url,
            github_profile_url=self.mock_github_profile_url,
            last_login=timezone.now(),
        )

    def test_user_detail(self):
        user = User.objects.get(oauth_id=self.mock_oauth_id)

        client = APIClient()
        client.force_authenticate(user=user)
        response = client.get('/auth/' + str(user.id) + '/')
        data = response.data

        self.assertEqual(data.get('id'), user.id)
        self.assertEqual(data.get('nickname'), user.nickname)
        self.assertEqual(data.get('oauth_id'), user.oauth_id)
        self.assertEqual(data.get('email'), user.email)
        self.assertEqual(data.get('name'), user.name)
        self.assertEqual(data.get('profile_image_url'), user.profile_image_url)
        self.assertEqual(data.get('github_api_url'), user.github_api_url)
        self.assertEqual(data.get('github_profile_url'), user.github_profile_url)

    def test_user_detail_non_exist(self):
        user = User.objects.get(oauth_id=self.mock_oauth_id)
        client = APIClient()
        client.force_authenticate(user=user)
        response = client.get(f'/auth/999/')

        self.assertEqual(response.status_code, 400)

    def test_user_detail_invalid_credential(self):
        user = User.objects.get(oauth_id=self.mock_oauth_id)
        dummy_user = User.objects.update_or_create_user(nickname='dummy-nickname', oauth_id='dummy-oauth-id')

        client = APIClient()
        client.force_authenticate(user=dummy_user)
        response = client.get(f'/auth/{user.id}/')

        self.assertEqual(response.status_code, 401)

    @patch('authentication.views.handle_get')
    @patch('authentication.views.handle_post')
    def test_github_callback(self, mock_post, mock_get):
        mock_post.return_value = json.loads('{"access_token": "abc123"}')
        mock_get.return_value = json.loads(
            '{'
            '"login": "abc-nickname",'
            '"id": 123,'
            '"email": "abc-email",'
            '"name": "abc-name",'
            '"avatar_url": "https://abc-avatar-url.com",'
            '"url": "https://abc-url.com",'
            '"html_url": "https://xyz-url.com"'
            '}'
        )

        client = APIClient()
        response = client.post('/auth/github/callback/?code=abc123')
        access_token = response.data.get('access')
        refresh_token = response.data.get('refresh')

        self.assertIsNotNone(access_token)
        self.assertIsNotNone(refresh_token)
