from django.test import TestCase
from output.utils import execute_code, execute_python, execute_javascript
from docker.errors import DockerException


class Test(TestCase):

    def test_execute_python(self):
        code = """
def solution(nums: [int]):
    ret = 0
    for i in nums:
        ret += i
    return ret
"""
        result = execute_python(code, [1, 1.1])
        print(result)

    def test_execute_javascript(self):
        code = """
function add(a, b) {
    return a + b;
}

result = add(1, 2);
console.log(result);
"""
        result = execute_javascript(code)
        print(result)
