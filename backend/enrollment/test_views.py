from datetime import datetime
from unittest.mock import patch
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
        result = response.data.get('results')

        self.assertEqual(len(result), 1)

    def test_enrollment_list_as_non_student(self):
        normal_user = User.objects.create(
            nickname='mock-normal_user',
            oauth_id='mock_normal_user_oauth_id',
        )

        client = APIClient()
        client.force_authenticate(user=normal_user)
        response = client.get('/enrollments/')
        result = response.data.get('results')

        self.assertEqual(len(result), 0)

    def test_enrollment_list_as_instructor(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.get('/enrollments/')
        result = response.data.get('results')

        self.assertEqual(len(result), 0)

    def test_enrollment_list_without_auth(self):
        client = APIClient()
        response = client.get('/enrollments/')

        self.assertEqual(response.status_code, 401)

    def test_enrollment_create_as_an_student(self):
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_2 = Lecture.objects.get(name=self.mock_lecture_name_2)

        data = {'lecture_id': lecture_2.id}
        client = APIClient()
        client.force_authenticate(user=student_1)
        response = client.post('/enrollments/', data=data, format='json')
        result = response.data

        self.assertIsNotNone(result.get('id'))

    def test_enrollment_create_duplicated(self):
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)

        data = {'lecture_id': lecture_1.id}
        client = APIClient()
        client.force_authenticate(user=student_1)
        response = client.post('/enrollments/', data=data, format='json')

        self.assertEqual(response.status_code, 400)

    def test_enrollment_create_without_auth(self):
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)

        data = {'lecture': lecture_1.id}
        client = APIClient()
        response = client.post('/enrollments/', data=data, format='json')

        self.assertEqual(response.status_code, 401)

    def test_enrollment_create_as_an_instructor(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)

        data = {'lecture': lecture_1.id}
        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.post('/enrollments/', data=data, format='json')

        self.assertEqual(response.status_code, 400)

    def test_enrollment_create_when_lecture_non_exist(self):
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)

        data = {'lecture': 99}
        client = APIClient()
        client.force_authenticate(user=student_1)
        response = client.post('/enrollments/', data=data, format='json')

        self.assertEqual(response.status_code, 400)


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

        self.assertEqual(result.get('id'), enrollment.id)

    def test_enrollment_retrieve_when_non_oneself(self):
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)
        enrollment = Enrollment.objects.get(student=student_1, lecture=lecture_1)
        student_2 = User.objects.get(oauth_id=self.mock_student_oauth_id_2)

        client = APIClient()
        client.force_authenticate(user=student_2)
        response = client.get(f'/enrollments/{enrollment.id}/')

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
