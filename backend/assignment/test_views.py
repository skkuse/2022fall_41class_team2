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
        # assignment1 = Assignment.objects.create(
        #     lecture = lecture_1,
        #     name = 'assignment name here',
        #     deadline = '2022-11-11',
        #     question = "what's 9 + 10",
        #     constraints = 'constraints: no constraints',
        #     skeleton_code = 'from libmemes import 9_10',
        # )

    # def test_assignment_list(self):
    #     # live
    #     instructor = User.objects.get(email=self.mock_instructor_email)
    #     lecture = Lecture.objects.get(name = self.mock_lecture_name_1)

    #     client = APIClient()
    #     client.force_authenticate(user=instructor)
    #     data = {'lecture_id' : lecture.id}
    #     response = client.generic(method = 'GET', path = '/assignments/', data = json.dumps(data), content_type = 'application/json')
    #     result = response.data.get('results')
    #     #print(response.data)
    #     self.assertEqual(len(result), 1)
    #     self.assertEqual(result[0].get('id'), 1)
    #     self.assertEqual(result[0].get('name'), 'assignment name here')


#     def test_lecture_list_with_student(self):
#         student = User.objects.get(email=self.mock_student_email)

#         client = APIClient()
#         client.force_authenticate(user=student)
#         response = client.get('/lectures/')
#         result = response.data.get('results')

#         self.assertEqual(len(result), 2)
#         self.assertFalse(result[0].get('is_instructor'))
#         self.assertTrue(result[0].get('is_student'))
#         self.assertFalse(result[1].get('is_instructor'))
#         self.assertFalse(result[1].get('is_student'))

#     def test_lecture_list_without_auth(self):
#         client = APIClient()
#         response = client.get('/lectures/')
#         result = response.data.get('results')

#         self.assertEqual(len(result), 2)
#         self.assertFalse(result[0].get('is_instructor'))
#         self.assertFalse(result[0].get('is_student'))
#         self.assertFalse(result[1].get('is_instructor'))
#         self.assertFalse(result[1].get('is_student'))

    def test_lecture_create(self):
        print('### 1')
        instructor = User.objects.get(email=self.mock_instructor_email)
        lecture = Lecture.objects.get(name = self.mock_lecture_name_1)

        data = {'lecture_id': lecture.id,
                'name': 'put your assignment here',
                'deadline':'2022-12-22',
                'question': "what's 9 + 10",
                'constraints':'constraints: no constraints',
                'skeleton_code':'from libmemes import 9_10',
            }

        print('### 2')
        client = APIClient()
        client.force_authenticate(user=instructor)
        print('### 3')
        response = client.post('/assignments/', data=data, format='json')
        print('### 4')
        result = response.data
        print(result)
        self.assertEqual(result.get('name'), 'put your assignment here')
        self.assertEqual(result.get('instructor').get('id'), instructor.id)

    # def test_lecture_create_without_auth(self):
    #     another_lecture_name = 'another-lecture-name'

    #     client = APIClient()
    #     response = client.post('/lectures/', data={'name': another_lecture_name}, format='json')

    #     self.assertEqual(response.status_code, 401)


# class TestLectureRetrieveOrDestroy(TestCase):
#     mock_instructor_email = 'mock-instructor@email.com'
#     mock_student_email = 'mock-student@email.com'
#     mock_lecture_name_1 = 'mock-lecture-name-1'
#     mock_lecture_name_2 = 'mock-lecture-name-2'

#     @patch('django.utils.timezone.now', return_value=datetime(2022, 1, 1, 1, 1, 1, tzinfo=timezone.utc))
#     def setUp(self, mock_now) -> None:
#         instructor = User.objects.create(
#             name='mock-instructor-name',
#             email=self.mock_instructor_email,
#             nickname='mock-instructor-nickname',
#             profile_image_url='https://mock-profile-image-url.com',
#             github_api_url='https://mock-github-api-url.com',
#             last_login=timezone.now(),
#         )
#         student = User.objects.create(
#             name='mock-student-name',
#             email=self.mock_student_email,
#             nickname='mock-student-nickname',
#             profile_image_url='https://mock-profile-image-url.com',
#             github_api_url='https://mock-github-api-url.com',
#             last_login=timezone.now(),
#         )
#         lecture_1 = Lecture.objects.create(
#             name=self.mock_lecture_name_1,
#             instructor=instructor,
#         )
#         lecture_2 = Lecture.objects.create(
#             name=self.mock_lecture_name_2,
#             instructor=instructor,
#         )
#         Enrollment.objects.create(
#             student=student,
#             lecture=lecture_1,
#         )

#     def test_lecture_retrieve_with_instructor(self):
#         instructor = User.objects.get(email=self.mock_instructor_email)
#         lecture = Lecture.objects.get(name=self.mock_lecture_name_2)

#         client = APIClient()
#         client.force_authenticate(user=instructor)
#         response = client.get(f'/lectures/{lecture.id}/')
#         result = response.data

#         self.assertEqual(result.get('id'), lecture.id)
#         self.assertTrue(result.get('is_instructor'))
#         self.assertFalse(result.get('is_student'))

#     def test_lecture_retrieve_with_student(self):
#         student = User.objects.get(email=self.mock_student_email)
#         lecture = Lecture.objects.get(name=self.mock_lecture_name_1)

#         client = APIClient()
#         client.force_authenticate(user=student)
#         response = client.get(f'/lectures/{lecture.id}/')
#         result = response.data

#         self.assertEqual(result.get('id'), lecture.id)
#         self.assertFalse(result.get('is_instructor'))
#         self.assertTrue(result.get('is_student'))

#     def test_lecture_retrieve_without_auth(self):
#         lecture = Lecture.objects.get(name=self.mock_lecture_name_1)

#         client = APIClient()
#         response = client.get(f'/lectures/{lecture.id}/')
#         result = response.data

#         self.assertEqual(result.get('id'), lecture.id)
#         self.assertFalse(result.get('is_instructor'))
#         self.assertFalse(result.get('is_student'))

#     def test_lecture_retrieve_with_non_exist_lecture(self):
#         non_lecture_id = 99

#         client = APIClient()
#         response = client.get(f'/lectures/{non_lecture_id}/')

#         self.assertEqual(response.status_code, 400)

#     def test_lecture_retrieve_with_non_proper_field(self):
#         non_proper_field = "abc"

#         client = APIClient()
#         response = client.get(f'/lectures/{non_proper_field}/')

#         self.assertEqual(response.status_code, 404)

#     def test_lecture_destroy_with_instructor(self):
#         instructor = User.objects.get(email=self.mock_instructor_email)
#         lecture = Lecture.objects.get(name=self.mock_lecture_name_2)

#         client = APIClient()
#         client.force_authenticate(user=instructor)
#         response = client.delete(f'/lectures/{lecture.id}/')

#         self.assertEqual(response.status_code, 204)

#     def test_lecture_destroy_with_non_instructor(self):
#         another_user = User.objects.create(
#             name='another-user-name',
#             email='another-email@email.com',
#             nickname='another-nickname',
#             profile_image_url='https://another-profile-image-url.com',
#             github_api_url='https://another-github-api-url.com',
#             last_login=timezone.now(),
#         )
#         lecture = Lecture.objects.get(name=self.mock_lecture_name_2)

#         client = APIClient()
#         client.force_authenticate(user=another_user)
#         response = client.delete(f'/lectures/{lecture.id}/')

#         self.assertEqual(response.status_code, 401)

#     def test_lecture_destroy_without_auth(self):
#         lecture = Lecture.objects.get(name=self.mock_lecture_name_2)

#         client = APIClient()
#         response = client.delete(f'/lectures/{lecture.id}/')

#         self.assertEqual(response.status_code, 401)
