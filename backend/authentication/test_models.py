from datetime import datetime, timezone
from unittest.mock import patch
from django.utils import timezone
from django.test import TestCase
from authentication.models import User


class TestUserManager(TestCase):
    mock_date_1 = datetime(2022, 1, 1, 1, 1, 1, tzinfo=timezone.utc)
    mock_date_2 = datetime(2022, 2, 2, 2, 2, 2, tzinfo=timezone.utc)
    mock_nickname = 'mock-nickname'
    mock_oauth_id = 'mock-oauth-id'
    mock_name = 'mock-name'
    mock_email = 'mock-email@email.com'
    mock_profile_image_url = 'https://mock-profile-image-url.com'
    mock_github_api_url = 'https://mock-github-api-url.com'
    mock_github_profile_url = 'https://mock-github-profile-url.com'

    @patch('django.utils.timezone.now', return_value=mock_date_1)
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

    def test_auto_add_values(self):
        user = User.objects.get(oauth_id=self.mock_oauth_id)

        self.assertEqual(user.created_at, self.mock_date_1)
        self.assertEqual(user.last_login, self.mock_date_1)

    def test_creat_user(self):
        nickname = 'new-nickname'
        oauth_id = 'new-oauth-id'
        user = User.objects.update_or_create_user(nickname=nickname, oauth_id=oauth_id)

        self.assertEqual(user.nickname, nickname)
        self.assertEqual(user.oauth_id, oauth_id)

    def test_create_user_with_none_value(self):
        nickname = 'new-nickname'
        oauth_id = 'new-oauth-id'
        email = None
        name = None
        profile_image_url = None
        github_api_url = None
        github_profile_url = None
        user = User.objects.update_or_create_user(
            nickname=nickname, oauth_id=oauth_id, email=email, name=name,
            profile_image_url=profile_image_url, github_api_url=github_api_url, github_profile_url=github_profile_url,
        )

        self.assertIsNotNone(user)

    def test_create_user_with_richness(self):
        nickname = 'new-nickname'
        oauth_id = 'new-oauth-id'
        email = 'new@example.com'
        name = 'new-name'
        user = User.objects.update_or_create_user(nickname=nickname, oauth_id=oauth_id, email=email, name=name)

        self.assertEqual(user.nickname, nickname)
        self.assertEqual(user.oauth_id, oauth_id)
        self.assertEqual(user.email, email)
        self.assertEqual(user.name, name)

    def test_create_user_without_nickname_field(self):
        with self.assertRaises(Exception):
            oauth_id = 'new-oauth-id'
            User.objects.update_or_create_user(oauth_id=oauth_id)

    def test_create_user_without_oauth_id_field(self):
        with self.assertRaises(Exception):
            nickname = 'new-nickname'
            User.objects.update_or_create_user(nickname=nickname)

    @patch('django.utils.timezone.now', return_value=mock_date_2)
    def test_update_user(self, mock_now):
        another_name = 'another-name'
        another_profile_image_url = 'https://another-profile-image-url.com'
        another_github_api_url = 'https://another-github-api-url.com'
        another_github_profile_url = 'https://another-github-profile-url.com'

        exist_user = User.objects.get(oauth_id=self.mock_oauth_id)
        user = User.objects.update_or_create_user(
            nickname=exist_user.nickname,
            oauth_id=exist_user.oauth_id,
            email=exist_user.email,
            name=another_name,
            profile_image_url=another_profile_image_url,
            github_api_url=another_github_api_url,
            github_profile_url=another_github_profile_url,
        )

        self.assertEqual(user.created_at, self.mock_date_1)
        self.assertEqual(user.last_login, self.mock_date_2)
        self.assertEqual(user.nickname, self.mock_nickname)
        self.assertEqual(user.oauth_id, self.mock_oauth_id)
        self.assertEqual(user.email, self.mock_email)
        self.assertEqual(user.name, another_name)
        self.assertEqual(user.profile_image_url, another_profile_image_url)
        self.assertEqual(user.github_api_url, another_github_api_url)
        self.assertEqual(user.github_profile_url, another_github_profile_url)

