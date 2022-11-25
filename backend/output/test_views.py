from datetime import timedelta
from unittest.mock import patch
from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APIClient
from authentication.models import User
from lecture.models import Lecture
from assignment.models import Assignment
from testcase.models import Testcase
from repo.models import Repo
from output.models import Result


class TestExercises(TestCase):
    user_oauth_id = 'mock-user-oauth-id'
    language = 'python'
    code = '''
def solution():
    size = int(input())
    nums = [float(e) for e in input().split()]

    ret = 0
    for num in nums:
        ret += num

    print(ret)
    return ret
'''
    input = '''
4
1 2.1 3.1 4
'''

    def setUp(self) -> None:
        User.objects.create(
            nickname='mock-user-nickname',
            oauth_id=self.user_oauth_id,
        )

    def test_retrieve_exercise_output(self):
        user = User.objects.get(oauth_id=self.user_oauth_id)
        data = {
            'language': self.language,
            'code': self.code,
            'input': self.input,
        }

        client = APIClient()
        client.force_authenticate(user=user)
        response = client.post(f'/outputs/exercises/', data=data, format='json')
        result = response.data

        self.assertEqual(result.get('exit_status'), 0)

    def test_retrieve_exercise_output_without_auth(self):
        data = {
            'language': self.language,
            'code': self.code,
            'input': self.input,
        }
        client = APIClient()
        response = client.post(f'/outputs/exercises/', data=data, format='json')

        self.assertEqual(response.status_code, 401)

    def test_retrieve_exercise_output_un_proper_method(self):
        user = User.objects.get(oauth_id=self.user_oauth_id)

        client = APIClient()
        client.force_authenticate(user=user)
        response = client.get(f'/outputs/exercises/', data={}, format='json')

        self.assertEqual(response.status_code, 405)


class TestTestcases(TestCase):
    mock_instructor_oauth_id = 'mock-instructor-oauth-id'
    mock_student_oauth_id = 'mock-student-oauth-id'
    mock_assignment_name = 'mock-assignment-name'
    language = 'python'
    code = '''
def solution():
    size = int(input())
    nums = [float(e) for e in input().split()]

    ret = 0
    for num in nums:
        ret += num

    print(ret)
    return ret
'''

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
        testcase_1 = Testcase.objects.create(
            assignment=assignment,
            is_hidden=False,
            input='3\n1 2 3\n',
            output='6.0\n'
        )
        testcase_2 = Testcase.objects.create(
            assignment=assignment,
            is_hidden=True,
            input='3\n1.1 2.2 3.3',
            output='6.6\n',
        )

    def test_retrieve_testcase_output(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        testcase = Testcase.objects.first()
        data = {
            'language': self.language,
            'code': self.code,
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post(f'/outputs/testcases/{testcase.id}/', data=data, format='json')
        ret = response.data

        self.assertFalse(ret.get('is_error'))
        self.assertIsNotNone(ret.get('input'))
        self.assertIsNotNone(ret.get('expected_output'))
        self.assertIsNotNone(ret.get('actual_output'))

    def test_retrieve_testcase_output_with_code_grammar_error(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        testcase = Testcase.objects.first()
        data = {
            'language': self.language,
            'code': 'def solution():\n    retur\n',
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post(f'/outputs/testcases/{testcase.id}/', data=data, format='json')
        ret = response.data

        self.assertTrue(ret.get('is_error'))
        self.assertIsNone(ret.get('actual_output'))

    def test_retrieve_testcase_when_non_exist_testcase(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        dummy_testcase_id = 99
        data = {
            'language': self.language,
            'code': self.code,
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post(f'/outputs/testcases/{dummy_testcase_id}/', data=data, format='json')

        self.assertEqual(response.status_code, 400)

    def test_retrieve_testcase_output_when_hidden_one(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        testcase = Testcase.objects.last()
        data = {
            'language': self.language,
            'code': self.code,
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post(f'/outputs/testcases/{testcase.id}/', data=data, format='json')

        self.assertEqual(response.status_code, 400)

    def test_retrieve_testcase_without_auth(self):
        testcase = Testcase.objects.first()
        data = {
            'language': self.language,
            'code': self.code,
        }

        client = APIClient()
        response = client.post(f'/outputs/testcases/{testcase.id}/', data=data, format='json')

        self.assertEqual(response.status_code, 401)


class TestResultListOrCreate(TestCase):
    mock_instructor_oauth_id = 'mock-instructor-oauth-id'
    mock_student_oauth_id = 'mock-student-oauth-id'
    mock_assignment_name = 'mock-assignment-name'

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
            deadline=timezone.now() + timedelta(days=1),
        )
        testcase_1 = Testcase.objects.create(
            assignment=assignment,
            is_hidden=False,
            input='3\n1 2 3\n',
            output='6.0\n'
        )
        testcase_2 = Testcase.objects.create(
            assignment=assignment,
            is_hidden=True,
            input='3\n1.1 2.2 3.3',
            output='6.6\n',
        )
        repo_1 = Repo.objects.create(
            assignment=assignment,
            author=student,
        )
        repo_2 = Repo.objects.create(
            assignment=assignment,
            author=student,
        )
        result_1 = Result.objects.create(
            repo=repo_1,
            references={
                'first': [
                    'one',
                    'two',
                ],
                'second': [
                    'three',
                    'four',
                ],
            },
        )
        result_2 = Result.objects.create(
            repo=repo_2,
        )

    def test_results_list(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        assignment = Assignment.objects.get(name=self.mock_assignment_name)

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.get('/outputs/results/', data={'assignment_id': assignment.id})
        ret = response.data.get('results')

        self.assertEqual(len(ret), 2)

    def test_results_list_without_auth(self):
        assignment = Assignment.objects.get(name=self.mock_assignment_name)

        client = APIClient()
        response = client.get('/outputs/results/', data={'assignment_id': assignment.id})

        self.assertEqual(response.status_code, 401)

    def test_results_create(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        repo = Repo.objects.first()
        data = {
            'repo_id': repo.id,
            'language': 'python',
            'code': '''
def solution():
    size = int(input())
    nums = [float(e) for e in input().split()]

    ret = 0
    for num in nums:
        ret += num

    print(ret)
    return ret
''',
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post('/outputs/results/', data=data, format='json')
        ret = response.data

        self.assertIsNotNone(ret.get('id'))
        self.assertIsNotNone(ret.get('functionality_result'))
        self.assertIsNotNone(ret.get('efficiency_result'))
        self.assertIsNotNone(ret.get('plagiarism_result'))
        self.assertIsNotNone(ret.get('readability_result'))

    def test_results_create_not_python(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        repo = Repo.objects.first()
        data = {
            'repo_id': repo.id,
            'language': 'cpp',
            'code': '''
#include <iostream>

using namespace std;

void solution() {
    int size = 0;
    cin >> size;

    float ret = 0;
    while (size--) {
        float num = 0;
        cin >> num;
        ret += num;
    }

    cout << ret << \'\\n\';
}
''',
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post('/outputs/results/', data=data, format='json')
        ret = response.data

        self.assertIsNotNone(ret.get('id'))
        self.assertIsNotNone(ret.get('functionality_result'))
        self.assertIsNone(ret.get('efficiency_result'))
        self.assertIsNone(ret.get('plagiarism_result'))
        self.assertIsNone(ret.get('readability_result'))

    def test_results_create_when_code_is_not_executable(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        repo = Repo.objects.first()
        data = {
            'repo_id': repo.id,
            'language': 'python',
            'code': '''
def solution():
    size = int(input())
    nums = [float(e) for e in input().split()]

    ret = 0
    for num in nums:
        ret += num

    print(ret)
    retur ret
''',
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post('/outputs/results/', data=data, format='json')
        ret = response.data

        self.assertIsNotNone(ret.get('id'))
        self.assertIsNone(ret.get('functionality_result'))
        self.assertIsNone(ret.get('efficiency_result'))
        self.assertIsNone(ret.get('plagiarism_result'))
        self.assertIsNone(ret.get('readability_result'))

    def test_results_create_when_repo_non_exist(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        dummy_repo_id = 99
        data = {
            'repo_id': dummy_repo_id,
            'language': 'python',
            'code': 'dummy-code',
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post('/outputs/results/', data=data, format='json')

        self.assertEqual(response.status_code, 400)

    def test_results_create_when_user_is_not_repo_author(self):
        not_own_repo_user = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        repo = Repo.objects.first()
        data = {
            'repo_id': repo.id,
            'language': 'python',
            'code': 'dummy-code',
        }

        client = APIClient()
        client.force_authenticate(user=not_own_repo_user)
        response = client.post('/outputs/results/', data=data, format='json')

        self.assertEqual(response.status_code, 403)

    def test_result_create_without_auth(self):
        repo = Repo.objects.first()
        data = {
            'repo_id': repo.id,
            'language': 'python',
            'code': 'dummy-code',
        }

        client = APIClient()
        response = client.post('/outputs/results/', data=data, format='json')

        self.assertEqual(response.status_code, 401)

    @patch('django.utils.timezone.now', return_value=timezone.now() + timedelta(weeks=1))
    def test_results_create_when_deadline_exceed(self, mock_now):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        repo = Repo.objects.first()
        data = {
            'repo_id': repo.id,
            'language': 'python',
            'code': 'dummy-code',
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post('/outputs/results/', data=data, format='json')

        self.assertEqual(response.status_code, 400)

    def test_results_create_when_exceed_possible_attempts(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        repo = Repo.objects.first()
        Result.objects.create(
            repo=repo,
        )
        data = {
            'repo_id': repo.id,
            'language': 'python',
            'code': 'dummy-code',
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post('/outputs/results/', data=data, format='json')

        self.assertEqual(response.status_code, 400)


class TestResultRetrieve(TestCase):
    mock_instructor_oauth_id = 'mock-instructor-oauth-id'
    mock_student_oauth_id = 'mock-student-oauth-id'
    mock_assignment_name = 'mock-assignment-name'

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
        repo_1 = Repo.objects.create(
            assignment=assignment,
            author=student,
        )
        result_1 = Result.objects.create(
            repo=repo_1,
            references={
                'first': [
                    'one',
                    'two',
                ],
                'second': [
                    'three',
                    'four',
                ],
            },
        )

    def test_result_retrieve(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        result = Result.objects.first()

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.get(f'/outputs/results/{result.id}/')
        ret = response.data

        self.assertIsNotNone(ret.get('id'))

    def test_result_retrieve_when_non_exist_result(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        dummy_result_id = 99

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.get(f'/outputs/results/{dummy_result_id}/')

        self.assertEqual(response.status_code, 400)

    def test_result_retrieve_as_non_repo_author(self):
        non_author_user = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        result = Result.objects.first()

        client = APIClient()
        client.force_authenticate(user=non_author_user)
        response = client.get(f'/outputs/results/{result.id}/')

        self.assertEqual(response.status_code, 403)
