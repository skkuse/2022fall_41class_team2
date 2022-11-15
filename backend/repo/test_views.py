from django.test import TestCase
from rest_framework.test import APIClient
from authentication.models import User
from lecture.models import Lecture
from assignment.models import Assignment
from repo.models import Repo


class TestRepoListOrCreate(TestCase):
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
        repo_1 = Repo.objects.create(
            author=student,
            assignment=assignment,
            content=dict({'python': 'dummy-code-01'})
        )
        repo_2 = Repo.objects.create(
            author=student,
            assignment=assignment,
            content=dict({'javascript': 'dummy-code-02'})
        )

    def test_repo_list(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        assignment = Assignment.objects.get(name=self.mock_assignment_name)

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.get('/repos/', data={'assignment_id': assignment.id})
        ret = response.data.get('results')

        self.assertEqual(len(ret), 2)

    def test_repo_list_when_assignment_non_exist(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        dummy_assignment_id = 99

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.get('/repos/', data={'assignment_id': dummy_assignment_id})
        ret = response.data.get('results')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(ret), 0)

    def test_repo_list_without_auth(self):
        assignment = Assignment.objects.get(name=self.mock_assignment_name)

        client = APIClient()
        response = client.get('/repos/', data={'assignment_id': assignment.id})

        self.assertEqual(response.status_code, 401)

    def test_repo_create(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        assignment = Assignment.objects.get(name=self.mock_assignment_name)
        data = {
            'assignment_id': assignment.id,
            'language': 'python',
            'code': 'dummy',
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post('/repos/', data=data, format='json')
        ret = response.data

        self.assertIsNotNone(ret.get('id'))
        self.assertEqual(ret.get('content').get('language'), data.get('language'))
        self.assertEqual(ret.get('content').get('code'), data.get('code'))

    def test_repo_create_when_assignment_non_exist(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        dummy_assignment_id = 99
        data = {
            'assignment_id': dummy_assignment_id,
            'language': 'python',
            'code': 'dummy',
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post('/repos/', data=data, format='json')

        self.assertEqual(response.status_code, 400)

    def test_repo_create_exceed_max_nums(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        assignment = Assignment.objects.get(name=self.mock_assignment_name)
        Repo.objects.create(
            author=student,
            assignment=assignment,
        )
        data = {
            'assignment_id': assignment.id,
            'language': 'python',
            'code': 'dummy',
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post('/repos/', data=data, format='json')

        self.assertEqual(response.status_code, 400)


class TestRepoRetrieveOrUpdateOrDestroy(TestCase):
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
        repo = Repo.objects.create(
            author=student,
            assignment=assignment,
            content=dict({'python': 'dummy-code-01'})
        )

    def test_repo_retrieve(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        repo = Repo.objects.first()

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.get(f'/repos/{repo.id}/')
        ret = response.data

        self.assertEqual(ret.get('id'), repo.id)
        self.assertIsNotNone(ret.get('content'))

    def test_repo_retrieve_when_non_repo_exist(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        dummy_repo_id = 99

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.get(f'/repos/{dummy_repo_id}/')

        self.assertEqual(response.status_code, 400)

    def test_repo_retrieve_as_non_author(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        repo = Repo.objects.first()

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.get(f'/repos/{repo.id}/')

        self.assertEqual(response.status_code, 403)

    def test_repo_retrieve_without_auth(self):
        repo = Repo.objects.first()

        client = APIClient()
        response = client.get(f'/repos/{repo.id}/')

        self.assertEqual(response.status_code, 401)

    def test_repo_update(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        repo = Repo.objects.first()
        data = {
            'language': 'python',
            'code': 'def solution():\n    return',
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.put(f'/repos/{repo.id}/', data=data, format='json')
        ret = response.data

        self.assertEqual(ret.get('id'), repo.id)
        self.assertEqual(ret.get('content').get('language'), data.get('language'))
        self.assertEqual(ret.get('content').get('code'), data.get('code'))

    def test_repo_update_when_non_repo_exist(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        dummy_repo_id = 99
        data = {
            'language': 'python',
            'code': 'def solution():\n    return',
        }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.put(f'/repos/{dummy_repo_id}/', data=data, format='json')

        self.assertEqual(response.status_code, 400)

    def test_repo_update_as_non_author(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        repo = Repo.objects.first()
        data = {
            'language': 'python',
            'code': 'def solution():\n    return',
        }

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.put(f'/repos/{repo.id}/', data=data, format='json')

        self.assertEqual(response.status_code, 403)

    def test_repo_update_without_auth(self):
        repo = Repo.objects.first()
        data = {
            'language': 'python',
            'code': 'def solution():\n    return',
        }

        client = APIClient()
        response = client.put(f'/repos/{repo.id}/', data=data, format='json')

        self.assertEqual(response.status_code, 401)

    def test_repo_delete(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        repo = Repo.objects.first()

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.delete(f'/repos/{repo.id}/')

        self.assertEqual(response.status_code, 204)

    def test_repo_delete_when_repo_non_exist(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        dummy_repo_id = 99

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.delete(f'/repos/{dummy_repo_id}/')

        self.assertEqual(response.status_code, 400)

    def test_repo_delete_as_non_author(self):
        instructor = User.objects.get(oauth_id=self.mock_instructor_oauth_id)
        repo = Repo.objects.first()

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.delete(f'/repos/{repo.id}/')

        self.assertEqual(response.status_code, 403)

    def test_repo_delete_without_auth(self):
        repo = Repo.objects.first()

        client = APIClient()
        response = client.delete(f'/repos/{repo.id}/')

        self.assertEqual(response.status_code, 401)
