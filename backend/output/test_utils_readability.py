import os
import tempfile

from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from assignment.models import Assignment
from repo.models import Repo
from output.models import Result
from output.utils_readability import run


class Test(TestCase):
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
        repo = Repo.objects.create(
            assignment=assignment,
            author=student,
        )
        result = Result.objects.create(
            repo=repo,
        )

    def test_readability(self):
        result = Result.objects.first()
        filename = None

        try:
            with tempfile.NamedTemporaryFile(
                mode='w',
                suffix='.py',
                delete=False,
            ) as file:
                file.write(self.code)
            filename = file.name

            ret = run(
                result=result,
                filename=filename,
            )

            self.assertIsNotNone(ret.get('id'))
            self.assertEqual(type(ret.get('pylint_score')), float)
            self.assertEqual(type(ret.get('pycodestyle_score')), int)
            self.assertEqual(type(ret.get('mypy_score')), int)
        finally:
            os.remove(filename)