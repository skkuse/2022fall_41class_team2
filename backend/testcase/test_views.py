from django.test import TestCase
from rest_framework.test import APIClient
from authentication.models import User
from lecture.models import Lecture
from assignment.models import Assignment
from testcase.models import Testcase


class TestTestcaseListOrCreate(TestCase):
    mock_instructor_oauth_id = 'mock-instructor-oauth-id'
    mock_student_oauth_id = 'mock-student-oauth-id'
    mock_assignment_name = 'mock_assignment_name'

    def setUp(self) -> None:
        student = User.objects.create(
            nickname='mock-student-nickname',
            oauth_id=self.mock_student_oauth_id,
        )
        instructor = User.objects.create(
            nickname='mock-instructor-nickname',
            oauth_id=self.mock_instructor_oauth_id,
        )
        lecture = Lecture.objects.create(
            name='mock-lecture-name',
            instructor=instructor,
        )
        assignment = Assignment.objects.create(
            name=self.mock_assignment_name,
            lecture=lecture,
        )
        public_testcase = Testcase.objects.create(
            is_hidden=False,
            input='1 2 3\n10\n',
            output='16\n',
            assignment=assignment,
        )
        private_testcase = Testcase.objects.create(
            is_hidden=True,
            input='4 5 6\n10\n',
            output='25\n',
            assignment=assignment,
        )

    def test_testcase_list_as_instructor(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        assignment = Assignment.objects.get(name=self.mock_assignment_name)

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.get(f'/testcases/', data={'assignment_id': assignment.id})
        result = response.data.get('results')

        self.assertEqual(len(result), 2)

    def test_testcase_list_as_non_instructor(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        assignment = Assignment.objects.get(name=self.mock_assignment_name)

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.get(f'/testcases/', data={'assignment_id': assignment.id})
        result = response.data.get('results')

        self.assertEqual(len(result), 1)

    def test_testcase_list_without_auth(self):
        assignment = Assignment.objects.get(name=self.mock_assignment_name)

        client = APIClient()
        response = client.get(f'/testcases/', data={'assignment_id': assignment.id})
        result = response.data.get('results')

        self.assertEqual(len(result), 1)

    def test_testcase_list_when_assignment_not_exist(self):
        dummy_assignment_id = 99

        client = APIClient()
        response = client.get(f'/testcases/', data={'assignment_id': dummy_assignment_id})
        result = response.data.get('results')

        self.assertEqual(len(result), 0)

    def test_testcase_create_as_instructor(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        assignment = Assignment.objects.get(name=self.mock_assignment_name)
        data = {
            'is_hidden': False,
            'input': '1\n2\n',
            'output': '3\n',
            'assignment_id': assignment.id,
        }

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.post(f'/testcases/', data=data, format='json')
        result = response.data

        self.assertIsNotNone(result.get('id'))

    def test_testcase_crate_as_non_instructor(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        assignment = Assignment.objects.get(name=self.mock_assignment_name)
        data = {
            'is_hidden': False,
            'input': '1\n2\n',
            'output': '3\n',
            'assignment_id': assignment.id,
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post(f'/testcases/', data=data, format='json')

        self.assertEqual(response.status_code, 403)

    def test_testcase_create_without_auth(self):
        assignment = Assignment.objects.get(name=self.mock_assignment_name)
        data = {
            'is_hidden': False,
            'input': '1\n2\n',
            'output': '3\n',
            'assignment_id': assignment.id,
        }

        client = APIClient()
        response = client.post(f'/testcases/', data=data, format='json')

        self.assertEqual(response.status_code, 401)

    def test_testcase_create_when_assignment_not_exist(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        dummy_assignment_id = 99
        data = {
            'is_hidden': False,
            'input': '1\n2\n',
            'output': '3\n',
            'assignment_id': dummy_assignment_id,
        }

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.post(f'/testcases/', data=data, format='json')

        self.assertEqual(response.status_code, 400)


class TestTestcaseRetrieveOrDestroy(TestCase):
    mock_instructor_oauth_id = 'mock-instructor-oauth-id'
    mock_student_oauth_id = 'mock-student-oauth-id'
    mock_assignment_name = 'mock_assignment_name'

    def setUp(self) -> None:
        student = User.objects.create(
            nickname='mock-student-nickname',
            oauth_id=self.mock_student_oauth_id,
        )
        instructor = User.objects.create(
            nickname='mock-instructor-nickname',
            oauth_id=self.mock_instructor_oauth_id,
        )
        lecture = Lecture.objects.create(
            name='mock-lecture-name',
            instructor=instructor,
        )
        assignment = Assignment.objects.create(
            name=self.mock_assignment_name,
            lecture=lecture,
        )
        public_testcase = Testcase.objects.create(
            is_hidden=False,
            input='1 2 3\n10\n',
            output='16\n',
            assignment=assignment,
        )
        private_testcase = Testcase.objects.create(
            is_hidden=True,
            input='4 5 6\n10\n',
            output='25\n',
            assignment=assignment,
        )

    def test_testcase_retrieve_publicly_as_instructor(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        testcase = Testcase.objects.get(is_hidden=False)

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.get(f'/testcases/{testcase.id}/')
        result = response.data

        self.assertEqual(result.get('id'), testcase.id)

    def test_testcase_retrieve_publicly_as_non_instructor(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        testcase = Testcase.objects.get(is_hidden=False)

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.get(f'/testcases/{testcase.id}/')
        result = response.data

        self.assertEqual(result.get('id'), testcase.id)

    def test_testcase_retrieve_publicly_without_auth(self):
        testcase = Testcase.objects.get(is_hidden=False)

        client = APIClient()
        response = client.get(f'/testcases/{testcase.id}/')
        result = response.data

        self.assertEqual(result.get('id'), testcase.id)

    def test_testcase_retrieve_privately_as_instructor(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        testcase = Testcase.objects.get(is_hidden=True)

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.get(f'/testcases/{testcase.id}/')
        result = response.data

        self.assertEqual(result.get('id'), testcase.id)

    def test_testcase_retrieve_privately_as_non_instructor(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        testcase = Testcase.objects.get(is_hidden=True)

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.get(f'/testcases/{testcase.id}/')

        self.assertEqual(response.status_code, 403)

    def test_testcase_retrieve_privately_without_auth(self):
        testcase = Testcase.objects.get(is_hidden=True)

        client = APIClient()
        response = client.get(f'/testcases/{testcase.id}/')

        self.assertEqual(response.status_code, 403)

    def test_testcase_destroy_as_instructor(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        testcase = Testcase.objects.get(is_hidden=False)

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.delete(f'/testcases/{testcase.id}/')

        self.assertEqual(response.status_code, 204)

    def test_testcase_destroy_as_non_instructor(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        testcase = Testcase.objects.get(is_hidden=False)

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.delete(f'/testcases/{testcase.id}/')

        self.assertEqual(response.status_code, 403)

    def test_testcase_destroy_without_auth(self):
        testcase = Testcase.objects.get(is_hidden=False)

        client = APIClient()
        response = client.delete(f'/testcases/{testcase.id}/')

        self.assertEqual(response.status_code, 401)
