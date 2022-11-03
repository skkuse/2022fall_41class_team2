from datetime import datetime, timezone
from unittest.mock import patch
from django.utils import timezone
from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from enrollment.models import Enrollment
from rest_framework.test import APIClient


class TestEnrollmentListOrCreate(TestCase):
    mock_instructor_email = 'mock-instructor@email.com'
    mock_student_email_1 = 'mock-student-1@email.com'
    mock_student_email_2 = 'mock-student-2@email.com'
    mock_student_email_3 = 'mock-student-3@email.com'
    mock_lecture_name_1 = 'mock-lecture-name-1'
    mock_lecture_name_2 = 'mock-lecture-name-2'


    @patch('django.utils.timezone.now', return_value=datetime(2022, 1, 1, 1, 1, 1, tzinfo=timezone.utc))
    def setUp(self, mock_now) -> None:
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

    def test_enrollment_list(self):
        instructor = User.objects.get(email=self.mock_instructor_email)
        student_1 = User.objects.get(email=self.mock_student_email_1)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.get('/enrollments/')
        result = response.data.get('results')

        self.assertEqual(len(result), 4)
        self.assertEqual(result[0].get('student_id'), student_1)
        self.assertEqual(result[0].get('lecture_id'), lecture_1)

    def test_enrollment_create(self):
        instructor = User.objects.get(email=self.mock_instructor_email)
        student_1 = User.objects.get(email=self.mock_student_email_1)
        lecture_2 = Lecture.objects.get(name=self.mock_lecture_name_2)

        data = {'student_id': student_1, 'lecture_id': lecture_2}        
        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.post('/enrollments/', data=data, format='json')
        result = response.data

        self.assertEqual(result.get('student_id'), student_1)
        self.assertEqual(result.get('lecture_id'), lecture_2)

    def test_enrollment_create_without_auth(self):
        student_1 = User.objects.get(email=self.mock_student_email_1)
        lecture_2 = Lecture.objects.get(name=self.mock_lecture_name_2)

        data = {'student_id': student_1, 'lecture_id': lecture_2}        
        client = APIClient()
        response = client.post('/enrollments/', data=data, format='json')

        self.assertEqual(response.status_code, 401)


class TestLectureRetrieveOrDestroy(TestCase):
    mock_instructor_email = 'mock-instructor@email.com'
    mock_student_email_1 = 'mock-student-1@email.com'
    mock_student_email_2 = 'mock-student-2@email.com'
    mock_student_email_3 = 'mock-student-3@email.com'
    mock_lecture_name_1 = 'mock-lecture-name-1'
    mock_lecture_name_2 = 'mock-lecture-name-2'


    @patch('django.utils.timezone.now', return_value=datetime(2022, 1, 1, 1, 1, 1, tzinfo=timezone.utc))
    def setUp(self, mock_now) -> None:
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


    def test_enrollment_retrieve(self):
        instructor = User.objects.get(email=self.mock_instructor_email)
        student_1 = User.objects.get(email=self.mock_student_email_1)
        student_3 = User.objects.get(email=self.mock_student_email_3)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)
        lecture_2 = Lecture.objects.get(name=self.mock_lecture_name_2)
        enrollment = Enrollment.objects.get(student_id=student_1, lecture_id=lecture_1)

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.get(f'/enrollments/{enrollment.id}/')
        result = response.data

        self.assertEqual(result.get('id'), enrollment.id)
        self.assertEqual(result.get('lecture_id'), enrollment.lecture_id)

    def test_enrollment_destroy(self):
        instructor = User.objects.get(email=self.mock_instructor_email)
        student_1 = User.objects.get(email=self.mock_student_email_1)
        student_3 = User.objects.get(email=self.mock_student_email_3)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)
        lecture_2 = Lecture.objects.get(name=self.mock_lecture_name_2)
        enrollment = Enrollment.objects.get(student_id=student_1, lecture_id=lecture_1)

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.delete(f'/enrollments/{enrollment.id}/')

        self.assertEqual(response.status_code, 204)

    def test_enrollment_destroy_without_instructor(self):
        student_1 = User.objects.get(email=self.mock_student_email_1)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)
        enrollment = Enrollment.objects.get(student_id=student_1, lecture_id=lecture_1)

        client = APIClient()
        response = client.delete(f'/enrollments/{enrollment.id}/')

        self.assertEqual(response.status_code, 401)