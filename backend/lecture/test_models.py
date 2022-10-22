from datetime import datetime, timezone
from unittest.mock import patch
from django.utils import timezone
from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture


class TestLecture(TestCase):
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

    def test_save_lecture(self):
        name = "dummy_name"
        instructor = User.objects.get(email=self.mock_email)
        lecture = Lecture.objects.create(name=name, instructor=instructor)

        self.assertIsNotNone(lecture.id)
        self.assertEqual(lecture.name, name)
        self.assertEqual(lecture.instructor, instructor)
