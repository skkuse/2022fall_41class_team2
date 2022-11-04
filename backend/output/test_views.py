from django.test import TestCase
from rest_framework.test import APIClient
from authentication.models import User


class Test(TestCase):
    user_oauth_id = 'mock-user-oauth-id'
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
    input = '''
4
1 2.1 3.1 4
'''

    def setUp(self) -> None:
        User.objects.create(
            nickname='mock-user-nickname',
            oauth_id=self.user_oauth_id,
        )

    def test_retrieve_exercise_output(self):
        user = User.objects.get(oauth_id=self.user_oauth_id)

        data = {
            'language': self.language,
            'code': self.code,
            'input': self.input,
        }
        client = APIClient()
        client.force_authenticate(user=user)
        response = client.post(f'/outputs/exercises/', data=data, format='json')
        result = response.data

        self.assertEqual(result.get('exit_status'), 0)

    def test_retrieve_exercise_output_without_auth(self):
        data = {
            'language': self.language,
            'code': self.code,
            'input': self.input,
        }
        client = APIClient()
        response = client.post(f'/outputs/exercises/', data=data, format='json')

        self.assertEqual(response.status_code, 401)

    def test_retrieve_exercise_output_un_proper_method(self):
        user = User.objects.get(oauth_id=self.user_oauth_id)

        client = APIClient()
        client.force_authenticate(user=user)
        response = client.get(f'/outputs/exercises/', data={}, format='json')

        self.assertEqual(response.status_code, 405)
