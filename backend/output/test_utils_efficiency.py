from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from assignment.models import Assignment
from testcase.models import Testcase
from repo.models import Repo
from output.models import Result
from output.utils_efficiency import run


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
    def test_generate_efficiency_result(self):
        result = Result.objects.first()
        # change "localpath" to fit your local path in order to run this test
        localpath = r"C:\Users\skdan\Documents\2022 Fall\소프트웨어공학개론\2022fall_41class_team2"
        filename = rf"{localpath}\backend\output\plag_test_dir\lesgedit.py"

        plswork = run(filename=filename, result=result)
        loc_score = plswork.get('loc_score')
        cf_score = plswork.get('control_flow_complexity_score')
        rw_score = plswork.get('reservation_words_score')
        df_score = plswork.get('data_flow_complexity_score')
    
        self.assertIsNotNone(plswork.get('id'))
        self.assertEqual(plswork.get("loc_score"), loc_score)
        self.assertEqual(plswork.get('control_flow_complexity_score'), cf_score)
        self.assertEqual(plswork.get('reservation_words_score'), rw_score)
        self.assertEqual(plswork.get('data_flow_complexity_score'), df_score)
