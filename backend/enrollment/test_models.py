from datetime import datetime, timezone
import email
from re import L
from unittest.mock import patch
from django.utils import timezone
from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from enrollment.models import Enrollment

class TestEnrollment(TestCase):
    mock_instructor_email = 'mock-instructor@email.com'
    mock_student_email_1 = 'mock-student-1@email.com'
    mock_student_email_2 = 'mock-student-2@email.com'
    mock_student_email_3 = 'mock-student-3@email.com'
    mock_lecture_name_1 = 'mock-lecture-name-1'
    mock_lecture_name_2 = 'mock-lecture-name-2'


    def test_enrollment(self):
        instructor = User.objects.create(
            name='mock-instructor-name',
            email=self.mock_instructor_email,
            nickname='mock-instructor-nickname',
            profile_image_url='https://mock-profile-image-url.com',
            github_api_url='https://mock-github-api-url.com',
            last_login=timezone.now(),
        )
        student_1 = User.objects.create(
            name='mock-student-name-1',
            email=self.mock_student_email_1,
            nickname='mock-student-nickname-1',
            profile_image_url='https://mock-profile-image-1-url.com',
            github_api_url='https://mock-github-api-1-url.com',
            last_login=timezone.now(),
        )
        student_2 = User.objects.create(
            name='mock-student-name-2',
            email=self.mock_student_email_2,
            nickname='mock-student-nickname-2',
            profile_image_url='https://mock-profile-image-2-url.com',
            github_api_url='https://mock-github-api-2-url.com',
            last_login=timezone.now(),
        )
        student_3 = User.objects.create(
            name='mock-student-name-3',
            email=self.mock_student_email_3,
            nickname='mock-student-nickname-3',
            profile_image_url='https://mock-profile-image-3-url.com',
            github_api_url='https://mock-github-api-3-url.com',
            last_login=timezone.now(),
        )
        lecture_1 = Lecture.objects.create(
            name=self.mock_lecture_name_1,
            instructor=instructor,
        )
        lecture_2 = Lecture.objects.create(
            name=self.mock_lecture_name_2,
            instructor=instructor,
        )
        enrollment_1=Enrollment.objects.create(
            student_id=student_1,
            lecture_id=lecture_1,
        )
        enrollment_2=Enrollment.objects.create(
            student_id=student_2,
            lecture_id=lecture_2,
        )
        enrollment_3=Enrollment.objects.create(
            student_id=student_3,
            lecture_id=lecture_1,
        )
        enrollment_4=Enrollment.objects.create(
            student_id=student_3,
            lecture_id=lecture_2,
        )

        enrollment1 = Enrollment.objects.filter(student_id=student_1)
        enrollment2 = Enrollment.objects.filter(student_id=student_3)
        enrollment3 = Enrollment.objects.filter(lecture_id=lecture_1)
        enrollment4 = Enrollment.objects.filter(lecture_id=lecture_2)

        self.assertEqual(len(enrollment1), 1)
        self.assertEqual(len(enrollment2), 2)
        self.assertEqual(len(enrollment3), 2)
        self.assertEqual(len(enrollment4), 2)
