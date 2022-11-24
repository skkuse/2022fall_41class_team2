from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from assignment.models import Assignment
from testcase.models import Testcase
from repo.models import Repo
from output.models import Result, FunctionalityResult


class TestResult(TestCase):

    def setUp(self) -> None:
        student = User.objects.create(
            nickname='mock-student-nickname',
            oauth_id='mock-student-oauth-id',
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
            name='mock-assignment-name',
            lecture=lecture,
        )
        repo = Repo.objects.create(
            assignment=assignment,
            author=student,
        )

    def test_result_save(self):
        repo = Repo.objects.first()
        references = {
            'videos': [
                'https://example-video-site-01.com',
                'https://example-video-site-02.com',
            ],
            'problems': [
                'https://example-problem-site-01.com',
                'https://example-problem-site-02.com',
            ],
            'materials': [
                'https://example-material-site-01.com',
                'https://example-material-site-02.com',
            ],
        }
        code_description = 'example-code-description'

        result = Result.objects.create(
            repo=repo,
            references=references,
            code_description=code_description,
        )

        self.assertIsNotNone(result.id)
        self.assertEqual(result.references, references)
        self.assertEqual(result.code_description, code_description)

    def test_result_default_values(self):
        repo = Repo.objects.first()

        result = Result.objects.create(
            repo=repo,
        )

        self.assertIsNotNone(result.id)
        self.assertEqual(result.references, dict())
        self.assertEqual(result.code_description, str())

    def test_result_remove(self):
        before_repo = Repo.objects.first()
        result = Result.objects.create(
            repo=before_repo,
            references=dict(),
            code_description='',
        )

        result.delete()
        after_repo = Repo.objects.first()

        self.assertEqual(after_repo, before_repo)


class TestFunctionalityResult(TestCase):

    def setUp(self) -> None:
        student = User.objects.create(
            nickname='mock-student-nickname',
            oauth_id='mock-student-oauth-id',
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
            name='mock-assignment-name',
            lecture=lecture,
        )
        testcase_1 = Testcase.objects.create(
            assignment=assignment,
            is_hidden=False,
        )
        testcase_2 = Testcase.objects.create(
            assignment=assignment,
            is_hidden=True,
        )
        repo = Repo.objects.create(
            assignment=assignment,
            author=student,
        )
        result = Result.objects.create(
            repo=repo,
        )

    def test_functionality_result_save(self):
        result = Result.objects.first()
        testcases = Testcase.objects.all()
        testcase_results = dict(
            (idx, {
                'is_hidden': testcase.is_hidden,
                'input': testcase.input,
                'expected_output': testcase.output,
                'actual_output': 'example-output',
            }) for (idx, testcase) in enumerate(testcases)
        )

        functionality_result = FunctionalityResult.objects.create(
            result=result,
            testcase_results=testcase_results,
        )

        self.assertIsNotNone(functionality_result.id)
        self.assertEqual(functionality_result.result, result)
        self.assertEqual(functionality_result.testcase_results, testcase_results)

    def test_functionality_result_default_values(self):
        result = Result.objects.first()

        functionality_result = FunctionalityResult.objects.create(
            result=result,
        )

        self.assertIsNotNone(functionality_result.id)
        self.assertEqual(functionality_result.testcase_results, list())

    def test_functionality_result_remove(self):
        before_result = Result.objects.first()
        functionality_result = FunctionalityResult.objects.create(
            result=before_result,
            testcase_results=list(),
        )

        functionality_result.delete()
        after_result = Result.objects.first()

        self.assertEqual(after_result, before_result)
