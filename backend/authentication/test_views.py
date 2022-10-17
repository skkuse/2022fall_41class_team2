import json

from datetime import datetime, timezone
from unittest.mock import patch
from django.utils import timezone
from django.test import TestCase
from rest_framework.test import APIClient
from authentication.models import User


class Test(TestCase):
    mock_date = datetime(2022, 1, 1, 1, 1, 1, tzinfo=timezone.utc)
    mock_name = 'mock-name'
    mock_email = 'mock-email@email.com'
    mock_nickname = 'mock-nickname'
    mock_profile_image_url = 'https://mock-profile-image-url.com'
    mock_github_api_url = 'https://mock-github-api-url.com'

    @patch('django.utils.timezone.now', return_value=mock_date)
    def setUp(self, mock_now) -> None:
        User.objects.create(
            name=self.mock_name,
            email=self.mock_email,
            nickname=self.mock_nickname,
            profile_image_url=self.mock_profile_image_url,
            github_api_url=self.mock_github_api_url,
            last_login=timezone.now(),
        )

    def test_user_detail(self):
        user = User.objects.get(email=self.mock_email)

        client = APIClient()
        client.force_authenticate(user=user)
        response = client.get('/auth/' + str(user.id) + '/')
        data = response.data

        self.assertEqual(data.get('id'), user.id)
        self.assertEqual(data.get('email'), user.email)
        self.assertEqual(data.get('nickname'), user.nickname)
        self.assertEqual(data.get('name'), user.name)
        self.assertEqual(data.get('profile_image_url'), user.profile_image_url)
        self.assertEqual(data.get('github_api_url'), user.github_api_url)

    def test_user_detail_invalid_credential(self):
        user = User.objects.get(email=self.mock_email)
        dummy_user = User.objects.update_or_create_user(email='dummy', nickname='dummy')

        client = APIClient()
        client.force_authenticate(user=dummy_user)
        client.get('/auth/' + str(user.id) + '/')

        self.assertRaises(Exception)

    @patch('authentication.views.handle_get')
    @patch('authentication.views.handle_post')
    def test_github_callback(self, mock_post, mock_get):
        mock_post.return_value = json.loads('{"access_token": "abc123"}')
        mock_get.return_value = json.loads(
            '{'
            '"email": "abc-email",'
            '"login": "abc-nickname",'
            '"name": "abc-name",'
            '"avatar_url": "https://abc-avatar-url.com",'
            '"url": "https://abc-url.com"'
            '}'
        )

        client = APIClient()
        response = client.post('/auth/github/callback/?code=abc123')
        auth_token = response.data.get('auth_token')

        self.assertIsNotNone(auth_token)
