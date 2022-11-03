from datetime import datetime
from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from assignment.models import Assignment


class TestLecture(TestCase):
    mock_instructor_email = 'mock-instructor@email.com'

    def test_assignment_save(self):
        instructor = User.objects.create(
            nickname='mock-instructor-nickname',
            oauth_id='mock-oauth-id',
        )
        lecture_name = 'dummy-lecture-name'
        lecture = Lecture.objects.create(
            name=lecture_name,
            instructor=instructor,
        )

        name = 'assignment name here'
        deadline = datetime(year=2022, month=12, day=31)
        question = "what's 9 + 10"
        constraints = 'what be my constraints'
        skeleton_code = '''
def solution():
    return 0
'''
        answer_code = '''
def solution():
    return 9 + 10
'''
        assignment = Assignment.objects.create(
            lecture=lecture,
            name=name,
            deadline=deadline,
            question=question,
            constraints=constraints,
            skeleton_code=skeleton_code,
            answer_code=answer_code,
        )

        self.assertIsNotNone(assignment.id)
        self.assertEqual(assignment.skeleton_code, skeleton_code)
        self.assertEqual(assignment.answer_code, answer_code)

    def test_lecture_save_with_very_long_answer_code_field(self):
        self.fail()

    def test_lecture_save_with_empty_name(self):
        self.fail()

    def test_lecture_remove(self):
        self.fail()
