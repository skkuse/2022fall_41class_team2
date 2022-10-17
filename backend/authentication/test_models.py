from datetime import datetime, timezone
from unittest.mock import patch
from django.utils import timezone
from django.test import TestCase
from authentication.models import User


class TestUserManager(TestCase):
    mock_date_1 = datetime(2022, 1, 1, 1, 1, 1, tzinfo=timezone.utc)
    mock_date_2 = datetime(2022, 2, 2, 2, 2, 2, tzinfo=timezone.utc)
    mock_name = 'mock-name'
    mock_email = 'mock-email@email.com'
    mock_nickname = 'mock-nickname'
    mock_profile_image_url = 'https://mock-profile-image-url.com'
    mock_github_api_url = 'https://mock-github-api-url.com'

    @patch('django.utils.timezone.now', return_value=mock_date_1)
    def setUp(self, mock_now) -> None:
        User.objects.create(
            name=self.mock_name,
            email=self.mock_email,
            nickname=self.mock_nickname,
            profile_image_url=self.mock_profile_image_url,
            github_api_url=self.mock_github_api_url,
            last_login=timezone.now(),
        )

    def test_auto_add_values(self):
        user = User.objects.get(email=self.mock_email)

        self.assertEqual(user.created_at, self.mock_date_1)
        self.assertEqual(user.last_login, self.mock_date_1)

    def test_create_user(self):
        email = 'new@example.com'
        nickname = 'new-nickname'
        name = 'new-name'
        user = User.objects.update_or_create_user(email=email, nickname=nickname, name=name)

        self.assertEqual(user.email, email)
        self.assertEqual(user.nickname, nickname)
        self.assertEqual(user.name, name)

    @patch('django.utils.timezone.now', return_value=mock_date_2)
    def test_update_user(self, mock_now):
        another_name = 'another-name'
        another_profile_image_url = 'https://another-profile-image-url.com'
        another_github_api_url = 'https://another-github-api-url.com'

        exist_user = User.objects.get(email=self.mock_email)
        user = User.objects.update_or_create_user(
            email=exist_user.email,
            nickname=exist_user.nickname,
            name=another_name,
            profile_image_url=another_profile_image_url,
            github_api_url=another_github_api_url
        )

        self.assertEqual(user.created_at, self.mock_date_1)
        self.assertEqual(user.last_login, self.mock_date_2)
        self.assertEqual(user.email, self.mock_email)
        self.assertEqual(user.nickname, self.mock_nickname)
        self.assertEqual(user.name, another_name)
        self.assertEqual(user.profile_image_url, another_profile_image_url)
        self.assertEqual(user.github_api_url, another_github_api_url)

