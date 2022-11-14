from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from assignment.models import Assignment
from repo.models import Repo
from output.models import Result
from output.utils_plagiarism import run


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

    def test_generate_plagiarism_result(self):
        result = Result.objects.first()
        # change "localpath" to fit your local path in order to run this test
        # # might need further minor adjustments depending on the OS
        localpath = r"C:\Users\skdan\Documents\2022 Fall\소프트웨어공학개론\2022fall_41class_team2"
        filename = rf"{localpath}\backend\output\plag_test_dir\lesgedit.py"
        test = rf"{localpath}\backend\output\plag_test_dir\reference\test"
        ref = rf"{localpath}\backend\output\plag_test_dir\reference"
        plswork = run(filename= filename, result = result, test_dir= test, ref_dir= ref)
        
        self.assertIsNotNone(plswork.get('id'))
        self.assertEqual(plswork.get("num_files_compared"), 13)
        self.assertEqual(plswork.get("similarity_score"), 100.0)