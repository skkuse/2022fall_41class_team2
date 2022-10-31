from django.test import TestCase
from output.utils import execute_code


class Test(TestCase):
    def test_execute_code(self):
        code = """
def add(a=1, b=2):
    print(a, b)
    return a + b


result = add()
print(result)
"""
        result = execute_code(code)
        print(result)
