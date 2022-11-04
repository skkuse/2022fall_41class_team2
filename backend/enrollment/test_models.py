from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from enrollment.models import Enrollment


class TestEnrollment(TestCase):
    mock_instructor_oauth_id = 'mock-instructor-oauth-id'
    mock_student_oauth_id = 'mock-student-oauth-id'
    mock_lecture_name = 'mock-lecture-name'

    def setUp(self):
        instructor = User.objects.create(
            nickname='mock-instructor-nickname',
            oauth_id=self.mock_instructor_oauth_id,
        )
        student = User.objects.create(
            nickname='mock-student-nickname-1',
            oauth_id=self.mock_student_oauth_id,
        )
        lecture = Lecture.objects.create(
            name=self.mock_lecture_name,
            instructor=instructor,
        )

    def test_enrollment_save(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        lecture = Lecture.objects.get(name=self.mock_lecture_name)
        enrollment = Enrollment.objects.create(
            student=student,
            lecture=lecture
        )

        self.assertIsNotNone(enrollment.id)
        self.assertEqual(enrollment.student, student)
        self.assertEqual(enrollment.lecture, lecture)

    def test_enrollment_remove(self):
        student = User.objects.get(oauth_id=self.mock_student_oauth_id)
        lecture = Lecture.objects.get(name=self.mock_lecture_name)
        enrollment = Enrollment.objects.create(
            student=student,
            lecture=lecture
        )

        result = enrollment.delete()

        self.assertEqual(result[1].get('id'), enrollment.id)
        self.assertIsNotNone(student)
        self.assertIsNotNone(lecture)
