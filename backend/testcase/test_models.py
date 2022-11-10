from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from assignment.models import Assignment
from testcase.models import Testcase


class TestTestcase(TestCase):
    mock_assignment_name = 'mock_assignment_name'

    def setUp(self) -> None:
        instructor = User.objects.create(
            nickname='mock-nickname',
            oauth_id='mock-oauth-id',
        )
        lecture = Lecture.objects.create(
            name='mock-lecture-name',
            instructor=instructor,
        )
        assignment = Assignment.objects.create(
            name=self.mock_assignment_name,
            lecture=lecture,
        )

    def test_testcase_save(self):
        assignment = Assignment.objects.get(name=self.mock_assignment_name)

        testcase = Testcase.objects.create(
            assignment=assignment,
            is_hidden=False,
            input="1\n2\n\3n",
            output="13\n",
        )

        self.assertIsNotNone(testcase.id)

    def test_testcase_save_default_value(self):
        assignment = Assignment.objects.get(name=self.mock_assignment_name)

        testcase = Testcase.objects.create(
            assignment=assignment,
        )

        self.assertTrue(testcase.is_hidden)
        self.assertEqual(testcase.input, "")
        self.assertEqual(testcase.output, "")

    def test_testcase_remove(self):
        assignment = Assignment.objects.get(name=self.mock_assignment_name)
        testcase = Testcase.objects.create(
            assignment=assignment,
            is_hidden=False,
            input="1\n2\n\3n",
            output="13\n",
        )

        result = testcase.delete()
        is_assignment_alive = Assignment.objects.filter(name=self.mock_assignment_name).exists()

        self.assertEqual(result[1].get('id'), testcase.id)
        self.assertTrue(is_assignment_alive)
