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

    def test_enrollment_list_as_instructor(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.get('/enrollments/')
        result = response.data.get('results')

        self.assertEqual(len(result), 4)
        self.assertEqual(result[0].get('student').get('id'), student_1.id)
        self.assertEqual(result[0].get('lecture').get('id'), lecture_1.id)
        self.assertTrue(result[0].get('lecture').get('is_instructor'))
        self.assertFalse(result[0].get('lecture').get('is_student'))

    def test_enrollment_list_as_student(self):
        self.fail()

    def test_enrollment_list_as_normal_user(self):
        self.fail()

    def test_enrollment_list_without_auth(self):
        self.fail()

    def test_enrollment_create(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_2 = Lecture.objects.get(name=self.mock_lecture_name_1)

        """
        @seungho
        You should not pass an instructor instance as an auth
        Student information is driven in request user
        """
        # data = {'student_id': student_1, 'lecture_id': lecture_2}
        # client = APIClient()
        # client.force_authenticate(user=instructor)
        # response = client.post('/enrollments/', data=data, format='json')
        # result = response.data

        self.fail()

    """
    @seungho
    This request should be rejected
    """
    def test_enrollment_create_as_an_instructor(self):
        self.fail()

    def test_enrollment_create_without_auth(self):
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_2 = Lecture.objects.get(name=self.mock_lecture_name_1)

        """
        @seungho
        Same reason in `test_enrollment_create`
        """
        # data = {'student_id': student_1, 'lecture_id': lecture_2}
        # client = APIClient()
        # response = client.post('/enrollments/', data=data, format='json')

        self.fail()


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

    def test_enrollment_retrieve(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)
        enrollment = Enrollment.objects.get(student=student_1, lecture=lecture_1)

        """
        @seungho
        Why request auth is passed an instructor instance?
        """
        # client = APIClient()
        # client.force_authenticate(user=instructor)
        # response = client.get(f'/enrollments/{enrollment.id}/')
        # result = response.data

        self.fail()

    def test_enrollment_retrieve_when_non_oneself(self):
        self.fail()

    def test_enrollment_retrieve_when_non_existed_instance(self):
        self.fail()

    def test_enrollment_destroy(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)
        enrollment = Enrollment.objects.get(student=student_1, lecture=lecture_1)

        """
        @seungho
        Same reason in `test_enrollment_retrieve`
        """
        # client = APIClient()
        # client.force_authenticate(user=instructor)
        # response = client.delete(f'/enrollments/{enrollment.id}/')

        self.fail()

    def test_enrollment_destroy_without_auth(self):
        student_1 = User.objects.get(oauth_id=self.mock_student_oauth_id_1)
        lecture_1 = Lecture.objects.get(name=self.mock_lecture_name_1)
        enrollment = Enrollment.objects.get(student=student_1, lecture=lecture_1)

        client = APIClient()
        response = client.delete(f'/enrollments/{enrollment.id}/')

        self.assertEqual(response.status_code, 401)

    def test_enrollment_destroy_when_non_existed_instance(self):
        self.fail()
