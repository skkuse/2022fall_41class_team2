from datetime import datetime, timezone
from unittest import mock
from django.utils import timezone
from django.test import TestCase
from authentication.models import User


class Test(TestCase):
    mock_date = datetime(2022, 1, 1, 1, 1, 1, tzinfo=timezone.utc)
    mock_name = 'mock-name'
    mock_email = 'mock-email@email.com'
    mock_nickname = 'mock-nickname'
    mock_profile_image_url = 'https://mock-profile-image-url.com'
    mock_github_api_url = 'https://mock-github-api-url.com'

    def setUp(self) -> None:
        with mock.patch('django.utils.timezone.now') as mock_now:
            mock_now.return_value = self.mock_date
            User.objects.create(
                name=self.mock_name,
                email=self.mock_email,
                nickname=self.mock_nickname,
                profile_image_url=self.mock_profile_image_url,
                github_api_url=self.mock_github_api_url,
                last_login=timezone.now(),
            )
