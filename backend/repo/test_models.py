from django.test import TestCase
from django.utils import timezone
from authentication.models import User
from lecture.models import Lecture
from assignment.models import Assignment
from repo.models import Repo


class TestRepo(TestCase):
    mock_student_oauth_id = 'mock-student-oauth-id'
    mock_assignment_name = 'mock_assignment_name'

    def setUp(self) -> None:
        student = User.objects.create(
            nickname='mock-student-nickname',
            oauth_id=self.mock_student_oauth_id,
        )
        instructor = User.objects.create(
            nickname='mock-instructor-nickname',
            oauth_id='mock-instructor-oauth-id',
        )
        lecture = Lecture.objects.create(
            name='mock-lecture-name',
            instructor=instructor,
        )
        assignment = Assignment.objects.create(
            name=self.mock_assignment_name,
            lecture=lecture,
        )

    def test_repo_save(self):
        author = User.objects.get(oauth_id=self.mock_student_oauth_id)
        assignment = Assignment.objects.get(name=self.mock_assignment_name)
        content = dict({'python': 'def solution():\n    return\n'})

        repo = Repo.objects.create(
            author=author,
            assignment=assignment,
            content=content,
        )

        self.assertIsNotNone(repo.id)
        self.assertEqual(repo.content, content)

    def test_repo_save_default_values(self):
        author = User.objects.get(oauth_id=self.mock_student_oauth_id)
        assignment = Assignment.objects.get(name=self.mock_assignment_name)

        repo = Repo.objects.create(
            author=author,
            assignment=assignment,
        )

        self.assertIsNotNone(repo.id)
        self.assertEqual(repo.content, dict())
        self.assertLessEqual(repo.created_at, timezone.now())
        self.assertLessEqual(repo.modified_at, timezone.now())

    def test_repo_remove(self):
        before_author = User.objects.get(oauth_id=self.mock_student_oauth_id)
        before_assignment = Assignment.objects.get(name=self.mock_assignment_name)
        repo = Repo.objects.create(
            author=before_author,
            assignment=before_assignment,
        )

        ret = repo.delete()
        after_author = User.objects.get(oauth_id=self.mock_student_oauth_id)
        after_assignment = Assignment.objects.get(name=self.mock_assignment_name)

        self.assertEqual(ret[1].get('id'), repo.id)
        self.assertIsNotNone(after_author)
        self.assertIsNotNone(after_assignment)
