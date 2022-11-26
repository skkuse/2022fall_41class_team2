from django.test import TestCase
from output.utils_code_explain import run
from output.utils_execution import SUPPORT_LANGUAGE


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
            language='PytHon',
        )

        self.assertIsNotNone(ret)

    def test_run_not_supported_language(self):
        languages = list(SUPPORT_LANGUAGE)
        languages.remove('python')
        languages.append('dummy-data')

        for language in languages:
            ret = run(raw_code='dummy-code', language=language)
            self.assertEqual(ret, str())
