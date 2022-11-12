from django.test import TestCase
from rest_framework.test import APIClient
from authentication.models import User
from lecture.models import Lecture
from assignment.models import Assignment
from repo.models import Repo
from output.models import Result


class Test(TestCase):
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
            'code': 'dummy-code',
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post('/outputs/results/', data=data, format='json')
        ret = response.data

        self.assertIsNotNone(ret.get('id'))

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
