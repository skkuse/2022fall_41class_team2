from datetime import datetime
from email.policy import default
from unittest.mock import patch
from urllib import response
from django.utils import timezone
from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from enrollment.models import Enrollment
from rest_framework.test import APIClient


class TestEnrollmentListOrCreate(TestCase):
    mock_instructor_oauth_id = 'mock-instructor-oauth-id'
    mock_student_oauth_id_1 = 'mock-student-oauth-id-1'
    mock_student_oauth_id_2 = 'mock-student-oauth-id-2'
    mock_student_oauth_id_3 = 'mock-student-oauth-id-3'
    mock_lecture_name_1 = 'mock-lecture-name-1'
    mock_lecture_name_2 = 'mock-lecture-name-2'

    @patch('django.utils.timezone.now', return_value=datetime(2022, 1, 1, 1, 1, 1, tzinfo=timezone.utc))
    def setUp(self, mock_now) -> None:
        instructor = User.objects.create(
            nickname='mock-instructor-nickname',
            oauth_id=self.mock_instructor_oauth_id,
        )
        student_1 = User.objects.create(
            nickname='mock-student-nickname-1',
            oauth_id=self.mock_student_oauth_id_1,
        )
        student_2 = User.objects.create(
            nickname='mock-student-nickname-2',
            oauth_id=self.mock_student_oauth_id_2,
        )
        student_3 = User.objects.create(
            nickname='mock-student-nickname-3',
            oauth_id=self.mock_student_oauth_id_3,
        )
        lecture_1 = Lecture.objects.create(
            name=self.mock_lecture_name_1,
            instructor=instructor,
        )
        lecture_2 = Lecture.objects.create(
            name=self.mock_lecture_name_2,
            instructor=instructor,
        )
        enrollment_1 = Enrollment.objects.create(
            student=student_1,
            lecture=lecture_1,
        )
        enrollment_2 = Enrollment.objects.create(
            student=student_2,
            lecture=lecture_2,
        )
        enrollment_3 = Enrollment.objects.create(
            student=student_3,
            lecture=lecture_1,
        )
        enrollment_4 = Enrollment.objects.create(
            student=student_3,
            lecture=lecture_2,
        )

    def test_enrollment_list_as_student(self):
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)
        enrollment_1 = Enrollment.objects.get(student=student_1, lecture=lecture_1)

        client = APIClient()
        client.force_authenticate(user=student_1)
        response = client.get('/enrollments/')
        result = response.data

        self.assertEqual(len(result), 1)
        self.assertEqual(result[0].get('student').get('id'), enrollment_1.student.id)
        self.assertEqual(result[0].get('lecture').get('id'), enrollment_1.lecture.id)

    def test_enrollment_list_as_normal_user(self):
        normal_user = User.objects.create(
            nickname='mock-normal_user',
            oauth_id='mock_normal_user_oauth_id',
        )

        client = APIClient()
        client.force_authenticate(user=normal_user)
        response = client.get('/enrollments/')

        self.assertEqual(response.status_code, 403)

    def test_enrollment_list_without_auth(self):
        client = APIClient()
        response = client.get('/enrollments/')

        self.assertEqual(response.status_code, 401)

    def test_enrollment_create_as_an_student(self):
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_2 = Lecture.objects.get(name=self.mock_lecture_name_1)

        data = {'student': student_1.id, 'lecture': lecture_2.id}
        client = APIClient()
        client.force_authenticate(user=student_1)
        response = client.post('/enrollments/', data=data, format='json')
        result = response.data

        self.assertEqual(result.get('student').get('id'), student_1.id)
        self.assertEqual(result.get('lecture').get('id'), lecture_2.id)

    def test_enrollment_create_as_an_instructor(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_2 = Lecture.objects.get(name=self.mock_lecture_name_1)

        data = {'student': student_1.id, 'lecture': lecture_2.id}
        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.post('/enrollments/', data=data, format='json')

        self.assertEqual(response.status_code, 403)

    def test_enrollment_create_without_auth(self):
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_2 = Lecture.objects.get(name=self.mock_lecture_name_1)

        data = {'student': student_1.id, 'lecture': lecture_2.id}
        client = APIClient()
        response = client.post('/enrollments/', data=data, format='json')

        self.assertEqual(response.status_code, 401)


class TestLectureRetrieveOrDestroy(TestCase):
    mock_instructor_oauth_id = 'mock-instructor-oauth-id'
    mock_student_oauth_id_1 = 'mock-student-oauth-id-1'
    mock_student_oauth_id_2 = 'mock-student-oauth-id-2'
    mock_student_oauth_id_3 = 'mock-student-oauth-id-3'
    mock_lecture_name_1 = 'mock-lecture-name-1'
    mock_lecture_name_2 = 'mock-lecture-name-2'

    def setUp(self) -> None:
        instructor = User.objects.create(
            nickname='mock-instructor-nickname',
            oauth_id=self.mock_instructor_oauth_id,
        )
        student_1 = User.objects.create(
            nickname='mock-student-nickname-1',
            oauth_id=self.mock_student_oauth_id_1,
        )
        student_2 = User.objects.create(
            nickname='mock-student-nickname-2',
            oauth_id=self.mock_student_oauth_id_2,
        )
        student_3 = User.objects.create(
            nickname='mock-student-nickname-3',
            oauth_id=self.mock_student_oauth_id_3,
        )
        lecture_1 = Lecture.objects.create(
            name=self.mock_lecture_name_1,
            instructor=instructor,
        )
        lecture_2 = Lecture.objects.create(
            name=self.mock_lecture_name_2,
            instructor=instructor,
        )
        enrollment_1 = Enrollment.objects.create(
            student=student_1,
            lecture=lecture_1,
        )
        enrollment_2 = Enrollment.objects.create(
            student=student_2,
            lecture=lecture_2,
        )
        enrollment_3 = Enrollment.objects.create(
            student=student_3,
            lecture=lecture_1,
        )
        enrollment_4 = Enrollment.objects.create(
            student=student_3,
            lecture=lecture_2,
        )

    def test_enrollment_retrieve_with_student(self):
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)
        enrollment = Enrollment.objects.get(student=student_1, lecture=lecture_1)

        client = APIClient()
        client.force_authenticate(user=student_1)
        response = client.get(f'/enrollments/{enrollment.id}/')
        result = response.data

        self.assertEqual(result.get('student').get('id'), student_1.id)
        self.assertEqual(result.get('lecture').get('id'), lecture_1.id)

    def test_enrollment_retrieve_when_non_oneself(self):
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        student_2 = User.objects.get(oauth_id=self.mock_student_oauth_id_2)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)
        enrollment = Enrollment.objects.get(student=student_1, lecture=lecture_1)

        client = APIClient()
        client.force_authenticate(user=student_2)
        response = client.get(f'/enrollments/{enrollment.id}/')
        result = response.data

        self.assertEqual(result, 0)  # why
        self.assertEqual(response.status_code, 403)

    def test_enrollment_retrieve_when_non_existed_instance(self):
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        non_existed_enrollment_id = 8888

        client = APIClient()
        client.force_authenticate(user=student_1)
        response = client.get(f'/enrollments/{non_existed_enrollment_id}/')

        self.assertEqual(response.status_code, 400)

    def test_enrollment_destroy_with_student(self):
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)
        enrollment = Enrollment.objects.get(student=student_1, lecture=lecture_1)

        client = APIClient()
        client.force_authenticate(user=student_1)
        response = client.delete(f'/enrollments/{enrollment.id}/')

        self.assertEqual(response.status_code, 204)

    def test_enrollment_destroy_without_auth(self):
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)
        enrollment = Enrollment.objects.get(student=student_1, lecture=lecture_1)

        client = APIClient()
        response = client.delete(f'/enrollments/{enrollment.id}/')

        self.assertEqual(response.status_code, 401)

    def test_enrollment_destroy_when_non_existed_instance(self):
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        non_existed_enrollment_id = 8888

        client = APIClient()
        client.force_authenticate(user=student_1)
        response = client.delete(f'/enrollments/{non_existed_enrollment_id}/')

        self.assertEqual(response.status_code, 400)
