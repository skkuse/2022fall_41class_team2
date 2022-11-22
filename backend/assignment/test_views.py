from datetime import datetime
from unittest.mock import patch
from django.utils import timezone
from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from rest_framework.test import APIClient
from assignment.models import Assignment
from testcase.models import Testcase


class TestAssignmentListOrCreate(TestCase):
    mock_instructor_oauth_id = 'mock-instructor-oauth-id'
    mock_student_oauth_id = 'mock-student-oauth-id'
    mock_lecture_name = 'mock-lecture-name'
    mock_assignment_name = 'assignment name here'

    @patch('django.utils.timezone.now', return_value=datetime(2022, 1, 1, 1, 1, 1, tzinfo=timezone.utc))
    def setUp(self, mock_now) -> None:
        instructor = User.objects.create(
            nickname='mock-instructor-nickname',
            oauth_id=self.mock_instructor_oauth_id,
        )
        student = User.objects.create(
            nickname='mock-student-nickname',
            oauth_id=self.mock_student_oauth_id,
        )
        lecture = Lecture.objects.create(
            name=self.mock_lecture_name,
            instructor=instructor,
        )
        assignment = Assignment.objects.create(
            lecture=lecture,
            name=self.mock_assignment_name,
            deadline=datetime(year=2022, month=12, day=31, tzinfo=timezone.utc),
            question="what's 9 + 10",
            constraints='constraints: no constraints',
            contents=[
                {
                    'language': 'python',
                    'skeleton_code': 'from libmemes import 9_10',
                    'answer_code': 'dummy-answer',
                },
                {
                    'language': 'javascript',
                    'skeleton_code': 'console.log("skeleton")',
                    'answer_code': 'function dummy() {}',
                },
            ],
        )
        testcase_1 = Testcase.objects.create(
            assignment=assignment,
            is_hidden=False,
            input='public-input',
            output='public-output',
        )
        testcase_2 = Testcase.objects.create(
            assignment=assignment,
            is_hidden=True,
            input='private-input',
            output='private-output',
        )

    def test_assignment_list(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        lecture = Lecture.objects.get(name=self.mock_lecture_name)
        assignment = Assignment.objects.get(name=self.mock_assignment_name)

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.get('/assignments/', data={'lecture_id': lecture.id}, format='json')
        result = response.data.get('results')

        self.assertEqual(len(result), 1)
        self.assertEqual(len(result[0].get('contents')), 2)
        self.assertEqual(result[0].get('id'), assignment.id)
        self.assertEqual(result[0].get('name'), assignment.name)
        self.assertEqual(len(result[0].get('testcases')), 2)

    def test_assignment_list_without_auth(self):
        lecture = Lecture.objects.get(name=self.mock_lecture_name)
        assignment = Assignment.objects.get(name=self.mock_assignment_name)

        client = APIClient()
        response = client.get('/assignments/', data={'lecture_id': lecture.id}, format='json')
        result = response.data.get('results')

        self.assertEqual(len(result), 1)
        self.assertEqual(result[0].get('id'), assignment.id)
        self.assertEqual(result[0].get('name'), assignment.name)
        self.assertEqual(len(result[0].get('testcases')), 2)

    def test_assignment_create_as_instructor(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        lecture = Lecture.objects.get(name=self.mock_lecture_name)
        data = {'lecture_id': lecture.id,
                'name': 'put your assignment here',
                'deadline': datetime(year=2022, month=1, day=1),
                'question': "what's 9 + 10",
                'constraints': 'constraints: no constraints',
                'contents': [{
                    'language': 'python',
                    'skeleton_code': 'from libmemes import 9_10',
                    'answer_code': 'hahaha',
                }]}

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.post('/assignments/', data=data, format='json')
        result = response.data

        self.assertEqual(result.get('name'), 'put your assignment here')

    def test_assignment_create_as_student(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        lecture = Lecture.objects.get(name=self.mock_lecture_name)
        data = {'lecture_id': lecture.id,
                'name': 'put your assignment here',
                'deadline': '2022-12-22',
                'question': "what's 9 + 10",
                'contents': [{
                    'language': 'python',
                    'skeleton_code': 'from libmemes import 9_10',
                    'answer_code': 'hahaha',
                }]}

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post('/assignments/', data=data, format='json')

        self.assertEqual(response.status_code, 403)

    def test_assignment_create_without_auth(self):
        lecture = Lecture.objects.get(name=self.mock_lecture_name)
        data = {'lecture_id': lecture.id,
                'name': 'put your assignment here',
                'deadline': '2022-12-22',
                'question': "what's 9 + 10",
                'contents': [{
                    'language': 'python',
                    'skeleton_code': 'from libmemes import 9_10',
                    'answer_code': 'hahaha',
                }]}

        client = APIClient()
        response = client.post('/assignments/', data=data, format='json')

        self.assertEqual(response.status_code, 401)


class TestLectureRetrieveOrDestroy(TestCase):
    mock_instructor_oauth_id = 'mock-instructor-oauth-id'
    mock_student_oauth_id = 'mock-student-oauth-id'
    mock_lecture_name = 'mock-lecture-name'
    mock_assignment_name_1 = 'assignment one'
    mock_assignment_name_2 = 'assignment two'

    @patch('django.utils.timezone.now', return_value=datetime(2022, 1, 1, 1, 1, 1, tzinfo=timezone.utc))
    def setUp(self, mock_now) -> None:
        instructor = User.objects.create(
            nickname='mock-instructor-nickname',
            oauth_id=self.mock_instructor_oauth_id,
        )
        student = User.objects.create(
            nickname='mock-student-nickname',
            oauth_id=self.mock_student_oauth_id,
        )
        lecture = Lecture.objects.create(
            name=self.mock_lecture_name,
            instructor=instructor,
        )
        assignment1 = Assignment.objects.create(
            lecture=lecture,
            name=self.mock_assignment_name_1,
            deadline=datetime(year=2022, month=12, day=1, tzinfo=timezone.utc),
            question="question 1: what's 9 + 10",
            constraints='constraints: no constraints',
            contents=[
                {
                    'language': 'python',
                    'skeleton_code': 'from libmemes1 import 9_10',
                    'answer_code': 'ha1',
                },
                {
                    'language': 'javascript',
                    'skeleton_code': 'console.log("skeleton1")',
                    'answer_code': 'function dummy1() {}',
                },
            ],
        )
        assignment2 = Assignment.objects.create(
            lecture=lecture,
            name=self.mock_assignment_name_2,
            deadline=datetime(year=2022, month=12, day=2, tzinfo=timezone.utc),
            question="question 2: what's 9 + 10",
            constraints='constraints: 1 constraint',
            contents=[
                {
                    'language': 'python',
                    'skeleton_code': 'from libmemes2 import 9_10',
                    'answer_code': 'ha2',
                },
                {
                    'language': 'javascript',
                    'skeleton_code': 'console.log("skeleton2")',
                    'answer_code': 'function dummy2() {}',
                },
            ],
        )
        testcase1 = Testcase.objects.create(
            assignment=assignment1,
            is_hidden=False,
            input='public-input',
            output='public-output',
        )
        testcase2 = Testcase.objects.create(
            assignment=assignment1,
            is_hidden=True,
            input='private-input',
            output='private-output',
        )

    def test_assignment_retrieve_with_instructor(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        assignment = Assignment.objects.get(name=self.mock_assignment_name_1)

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.get(f'/assignments/{assignment.id}/')
        result = response.data

        self.assertEqual(result.get('id'), assignment.id)
        self.assertEqual(result.get('name'), assignment.name)

    def test_assignment_retrieve_with_student(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        assignment = Assignment.objects.get(name=self.mock_assignment_name_1)

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.get(f'/assignments/{assignment.id}/')
        result = response.data

        self.assertEqual(result.get('id'), assignment.id)
        self.assertEqual(result.get('name'), assignment.name)

    def test_assignment_retrieve_without_auth(self):
        assignment = Assignment.objects.get(name=self.mock_assignment_name_1)

        client = APIClient()
        response = client.get(f'/assignments/{assignment.id}/')

        self.assertEqual(response.status_code, 200)

    # todo: create this case
    def test_assignment_retrieve_when_non_exist_assignment(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        dne_assignment_id = 100

        client = APIClient()
        client.force_authenticate(user=student)

        response = client.get(f'/assignments/{dne_assignment_id}/')

        self.assertEqual(response.status_code, 400)

    def test_assignment_destroy_with_instructor(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        assignment = Assignment.objects.get(name=self.mock_assignment_name_1)

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.delete(f'/assignments/{assignment.id}/')

        self.assertEqual(response.status_code, 204)

    def test_assignment_destroy_with_non_instructor(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        assignment = Assignment.objects.get(name=self.mock_assignment_name_1)

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.delete(f'/assignments/{assignment.id}/')

        self.assertEqual(response.status_code, 403)

    def test_assignment_destroy_without_auth(self):
        assignment = Assignment.objects.get(name=self.mock_assignment_name_1)

        client = APIClient()
        response = client.delete(f'/assignments/{assignment.id}/')

        self.assertEqual(response.status_code, 401)
