from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from assignment.models import Assignment
from testcase.models import Testcase
from repo.models import Repo
from output.models import Result
from output.utils_functionality import run


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
        testcase_1 = Testcase.objects.create(
            assignment=assignment,
            is_hidden=False,
            input='3\n1 2 3',
            output='6.0'
        )
        testcase_2 = Testcase.objects.create(
            assignment=assignment,
            is_hidden=True,
            input='3\n1.1 2.2 3.3',
            output='6.6',
        )
        repo = Repo.objects.create(
            assignment=assignment,
            author=student,
        )
        result = Result.objects.create(
            repo=repo,
        )

    def test_generate_functionality_result(self):
        result = Result.objects.first()
        assignment = Assignment.objects.first()
        testcase = Testcase.objects.first()

        ret = run(result, assignment, self.language, self.code)

        self.assertIsNotNone(ret.get('id'))
        self.assertEqual(len(ret.get('testcase_results')), 2)
        self.assertEqual(ret.get('testcase_results')[0].get('input'), testcase.input)
        self.assertEqual(ret.get('testcase_results')[0].get('expected_output'), testcase.output)
        self.assertIsNotNone(ret.get('testcase_results')[0].get('actual_output'))
        self.assertIsNone(ret.get('testcase_results')[1].get('input'))
        self.assertIsNone(ret.get('testcase_results')[1].get('expected_output'))
        self.assertIsNone(ret.get('testcase_results')[1].get('actual_output'))
