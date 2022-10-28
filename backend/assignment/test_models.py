from datetime import datetime, timezone
from unittest.mock import patch
from django.utils import timezone
from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from assignment.models import Assignment

class TestLecture(TestCase):
    mock_instructor_email = 'mock-instructor@email.com'

    # @patch('django.utils.timezone.now', return_value=datetime(2022, 1, 1, 1, 1, 1, tzinfo=timezone.utc))
    # def setUp(self, mock_now) -> None:
    #     # User.objects.create(
    #     #     name='mock-instructor-name',
    #     #     email=self.mock_instructor_email,
    #     #     nickname='mock-instructor-nickname',
    #     #     profile_image_url='https://mock-instructor-profile-image-url.com',
    #     #     github_api_url='https://mock-instructor-github-api-url.com',
    #     #     last_login=timezone.now(),
    #     # )
    #     # lecture_name = 'dummy-lecture-name'
    #     # instructor = User.objects.get(email=self.mock_instructor_email)

    #     # lecture1 = Lecture.objects.create(
    #     #     name=lecture_name,
    #     #     instructor=instructor
    #     # )

        

    def test_assignment_save(self):
        User.objects.create(
            name='mock-instructor-name',
            email=self.mock_instructor_email,
            nickname='mock-instructor-nickname',
            profile_image_url='https://mock-instructor-profile-image-url.com',
            github_api_url='https://mock-instructor-github-api-url.com',
            last_login=timezone.now(),
        )
        lecture_name = 'dummy-lecture-name'
        instructor = User.objects.get(email=self.mock_instructor_email)

        lectureObj = Lecture.objects.create(
            name=lecture_name,
            instructor=instructor
        )
        lecture = lectureObj
        name = 'assignment name here'
        deadline = '2022-11-11'
        question = "what's 9 + 10"
        constraints = 'what be my constraints'
        skeleton_code = 'from libme import melmao'

        assignment = Assignment.objects.create(
            lecture = lecture,
            name = name,
            deadline = deadline,
            question = question,
            constraints = constraints,
            skeleton_code = skeleton_code,
        )
        self.assertIsNotNone(lecture)
        self.assertEqual(assignment.name, name)
        self.assertEqual(assignment.deadline, deadline)
"""
    def test_lecture_save_with_empty_lecture_name(self):
        instructor = User.objects.get(email=self.mock_instructor_email)

        lecture = Lecture.objects.create(
            instructor=instructor
        )

        self.assertIsNotNone(lecture.id)
        self.assertEqual(lecture.name, '')

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
"""