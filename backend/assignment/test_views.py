from datetime import datetime, timezone
import json
from unittest.mock import patch
from django.utils import timezone
from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from enrollment.models import Enrollment
from rest_framework.test import APIClient
from assignment.models import Assignment
from django.urls import reverse

class TestAssignmentListOrCreate(TestCase):
    mock_instructor_email = 'mock-instructor@email.com'
    mock_student_email = 'mock-student@email.com'
    mock_lecture_name_1 = 'mock-lecture-name-1'
    mock_lecture_name_2 = 'mock-lecture-name-2'

    @patch('django.utils.timezone.now', return_value=datetime(2022, 1, 1, 1, 1, 1, tzinfo=timezone.utc))
    def setUp(self, mock_now) -> None:
        instructor = User.objects.create(
            name='mock-instructor-name',
            email=self.mock_instructor_email,
            nickname='mock-instructor-nickname',
            profile_image_url='https://mock-profile-image-url.com',
            github_api_url='https://mock-github-api-url.com',
            last_login=timezone.now(),
        )
        student = User.objects.create(
            name='mock-student-name',
            email=self.mock_student_email,
            nickname='mock-student-nickname',
            profile_image_url='https://mock-profile-image-url.com',
            github_api_url='https://mock-github-api-url.com',
            last_login=timezone.now(),
        )
        lecture_1 = Lecture.objects.create(
            name=self.mock_lecture_name_1,
            instructor=instructor,
        )
        lecture_2 = Lecture.objects.create(
            name=self.mock_lecture_name_2,
            instructor=instructor,
        )
        Enrollment.objects.create(
            student=student,
            lecture=lecture_1,
        )
        assignment1 = Assignment.objects.create(
            lecture = lecture_1,
            name = 'assignment name here',
            deadline = '2022-11-11',
            question = "what's 9 + 10",
            constraints = 'constraints: no constraints',
            skeleton_code = 'from libmemes import 9_10',
        )

    def test_assignment_list(self):
        instructor = User.objects.get(email=self.mock_instructor_email)
        lecture = Lecture.objects.get(name = self.mock_lecture_name_1)

        client = APIClient()
        client.force_authenticate(user=instructor)
        data = {'lecture_id' : lecture.id}
        response = client.generic(method = 'GET', path = '/assignments/', data = json.dumps(data), content_type = 'application/json')
        result = response.data.get('results')
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0].get('id'), 1)
        self.assertEqual(result[0].get('name'), 'assignment name here')


    def test_assignment_create_as_instructor(self):
        instructor = User.objects.get(email=self.mock_instructor_email)
        lecture = Lecture.objects.get(name = self.mock_lecture_name_1)

        data = {'lecture_id': lecture.id,
                'name': 'put your assignment here',
                'deadline':'2022-12-22',
                'question': "what's 9 + 10",
                'constraints':'constraints: no constraints',
                'skeleton_code':'from libmemes import 9_10',
            }

        client = APIClient()
        client.force_authenticate(user=instructor)
        response = client.post('/assignments/', data=data, format='json')
        result = response.data
        self.assertEqual(result.get('name'), 'put your assignment here')
        self.assertEqual(result.get('lecture').get('instructor'), instructor.id)

    def test_assignment_create_as_student(self):
        student = User.objects.get(email=self.mock_student_email)
        lecture = Lecture.objects.get(name = self.mock_lecture_name_1)
        data = {'lecture_id': lecture.id,
                'name': 'put your assignment here',
                'deadline':'2022-12-22',
                'question': "what's 9 + 10",
                'constraints':'constraints: no constraints',
                'skeleton_code':'from libmemes import 9_10',
            }

        client = APIClient()
        client.force_authenticate(user=student)
        response = client.post('/assignments/', data=data, format='json')
        result = response.data
        self.assertEqual(response.status_code, 403)

    def test_assignment_create_without_auth(self):
        instructor = User.objects.get(email=self.mock_instructor_email)
        lecture = Lecture.objects.get(name = self.mock_lecture_name_1)

        data = {'lecture_id': lecture.id,
                'name': 'put your assignment here',
                'deadline':'2022-12-22',
                'question': "what's 9 + 10",
                'constraints':'constraints: no constraints',
                'skeleton_code':'from libmemes import 9_10',
            }

        client = APIClient()
        response = client.post('/assignments/', data=data, format='json')

        self.assertEqual(response.status_code, 401)


class TestLectureRetrieveOrDestroy(TestCase):
    mock_instructor_email = 'mock-instructor@email.com'
    mock_student_email = 'mock-student@email.com'
    mock_lecture_name_1 = 'mock-lecture-name-1'
    mock_lecture_name_2 = 'mock-lecture-name-2'

    @patch('django.utils.timezone.now', return_value=datetime(2022, 1, 1, 1, 1, 1, tzinfo=timezone.utc))
    def setUp(self, mock_now) -> None:
        instructor = User.objects.create(
            name='mock-instructor-name',
            email=self.mock_instructor_email,
            nickname='mock-instructor-nickname',
            profile_image_url='https://mock-profile-image-url.com',
            github_api_url='https://mock-github-api-url.com',
            last_login=timezone.now(),
        )
        student = User.objects.create(
            name='mock-student-name',
            email=self.mock_student_email,
            nickname='mock-student-nickname',
            profile_image_url='https://mock-profile-image-url.com',
            github_api_url='https://mock-github-api-url.com',
            last_login=timezone.now(),
        )
        lecture_1 = Lecture.objects.create(
            name=self.mock_lecture_name_1,
            instructor=instructor,
        )
        lecture_2 = Lecture.objects.create(
            name=self.mock_lecture_name_2,
            instructor=instructor,
        )
        Enrollment.objects.create(
            student=student,
            lecture=lecture_1,
        )
        assignment1 = Assignment.objects.create(
            lecture = lecture_1,
            name = 'assignment one',
            deadline = '2022-11-11',
            question = "question 1: what's 9 + 10",
            constraints = 'constraints: no constraints',
            skeleton_code = 'from libmemes import 9_10',
        )
        assignment2 = Assignment.objects.create(
            lecture = lecture_1,
            name = 'assignment two',
            deadline = '2022-2-2',
            question = "question 2: what's 9 + 10",
            constraints = 'constraints: 1 constraint',
            skeleton_code = 'from libmemes2 import 9Plus10',
        )

    def test_assignment_retrieve_with_instructor(self):
        instructor = User.objects.get(email=self.mock_instructor_email)

        assignment = Assignment.objects.get(name = 'assignment one')

        client = APIClient()
        client.force_authenticate(user=instructor)

        response = client.get(reverse("assignment_retrieve_or_destroy", kwargs={'id': assignment.id}))
        result = response.data

        self.assertEqual(result.get('id'), assignment.id)
        self.assertEqual(result.get('name'), assignment.name)

    def test_assignment_retrieve_with_student(self):
        student = User.objects.get(email=self.mock_student_email)
        assignment = Assignment.objects.get(name = 'assignment one')

        client = APIClient()
        client.force_authenticate(user=student)

        response = client.get(reverse("assignment_retrieve_or_destroy", kwargs={'id': assignment.id}))
        result = response.data

        self.assertEqual(result.get('id'), assignment.id)
        self.assertEqual(result.get('name'), assignment.name)

    def test_assignment_retrieve_without_auth(self):
        assignment = Assignment.objects.get(name = 'assignment one')

        client = APIClient()
        response = client.get(reverse("assignment_retrieve_or_destroy", kwargs={'id': assignment.id}))


        self.assertEqual(response.status_code, 401)

    def test_assignment_destroy_with_instructor(self):
        instructor = User.objects.get(email=self.mock_instructor_email)
        assignment = Assignment.objects.get(name = 'assignment one')

        client = APIClient()
        client.force_authenticate(user=instructor)
        
        response = client.delete(reverse("assignment_retrieve_or_destroy", kwargs={'id': assignment.id}))

        self.assertEqual(response.status_code, 204)

    def test_assignment_destroy_with_non_instructor(self):
        another_user = User.objects.create(
            name='another-user-name',
            email='another-email@email.com',
            nickname='another-nickname',
            profile_image_url='https://another-profile-image-url.com',
            github_api_url='https://another-github-api-url.com',
            last_login=timezone.now(),
        )
        assignment = Assignment.objects.get(name = 'assignment one')

        client = APIClient()
        client.force_authenticate(user=another_user)
        response = client.delete(reverse("assignment_retrieve_or_destroy", kwargs={'id': assignment.id}))

        # Todo: does the status code have to be 401 Unauthorized?
        self.assertEqual(response.status_code, 403)

    def test_assignment_destroy_without_auth(self):
        assignment = Assignment.objects.get(name = 'assignment one')

        client = APIClient()
        response = client.delete(reverse("assignment_retrieve_or_destroy", kwargs={'id': assignment.id}))

        self.assertEqual(response.status_code, 401)
