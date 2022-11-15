from django.test import TestCase
from output.utils_code_explain import run


class Test(TestCase):

    def test_execute_codex(self):
        ret = run(
            raw_code='''
def solution():
    size = int(input())
    nums = [float(e) for e in input().split()]

    ret = 0
    for num in nums:
        ret += num

    print(ret)
    return ret
''',
        )

        self.assertIsNotNone(ret)
