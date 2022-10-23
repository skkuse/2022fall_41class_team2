from datetime import datetime, timezone
from unittest.mock import patch
from django.utils import timezone
from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture


class TestLecture(TestCase):
    mock_instructor_email = 'mock-instructor@email.com'

    @patch('django.utils.timezone.now', return_value=datetime(2022, 1, 1, 1, 1, 1, tzinfo=timezone.utc))
    def setUp(self, mock_now) -> None:
        User.objects.create(
            name='mock-instructor-name',
            email=self.mock_instructor_email,
            nickname='mock-instructor-nickname',
            profile_image_url='https://mock-instructor-profile-image-url.com',
            github_api_url='https://mock-instructor-github-api-url.com',
            last_login=timezone.now(),
        )

    def test_lecture_save(self):
        lecture_name = "dummy-lecture-name"
        instructor = User.objects.get(email=self.mock_instructor_email)

        lecture = Lecture.objects.create(
            name=lecture_name,
            instructor=instructor
        )

        self.assertIsNotNone(lecture.id)
        self.assertEqual(lecture.name, lecture_name)
        self.assertEqual(lecture.instructor, instructor)

    def test_lecture_remove(self):
        instructor = User.objects.get(email=self.mock_instructor_email)
        lecture = Lecture.objects.create(
            name='dummy-lecture-name',
            instructor=instructor,
        )

        result = lecture.delete()
        after_user = User.objects.get(email=self.mock_instructor_email)

        self.assertEqual(result[1].get('id'), lecture.id)
        self.assertIsNotNone(after_user)
