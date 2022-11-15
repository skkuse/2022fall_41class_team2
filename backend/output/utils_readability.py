import os
import re

from backend.settings.base import BASE_DIR
from output.models import Result
from output.serializers import ReadabilityResultSerializer

SERVER_CODE_DIR = str(BASE_DIR) + os.environ['SERVER_CODE_DIR']


def run(result: Result, filename: str):
    pylint_score = execute_pylint(filename=filename)
    pycodestyle_score = execute_pycodestyle(filename=filename)
    mypy_score = execute_mypy(filename=filename)

    readability_serialize = ReadabilityResultSerializer(data={
        'result_id': result.id,
        'pylint_score': pylint_score,
        'pycodestyle_score': pycodestyle_score,
        'mypy_score': mypy_score,
    })
    readability_serialize.is_valid(raise_exception=True)
    readability_serialize.save()

    return readability_serialize.data


def execute_pylint(filename: str):
    terminal_command = f'pylint {filename}'
    stream = os.popen(terminal_command)
    output = stream.read()
    result = float(re.findall(r'\d+.\d+', output.split('\n')[-3])[0])
    return result


def execute_pycodestyle(filename: str):
    terminal_command = f'pycodestyle --count {filename}'
    stream = os.popen(terminal_command)
    output = stream.read()
    error = len(output.split('\n')) - 1
    result = 10 - error
    if result < 0:
        return 0
    else:
        return result


def execute_mypy(filename: str):
    terminal_command = f'mypy {filename}'
    stream = os.popen(terminal_command)
    output = stream.read()
    output_last = output.split('\n')[-2]
    if output_last.split(' ')[0] == "Found":
        error = int(re.findall(r'\d+', output_last)[0])
    else:
        error = 0
    result = 10 - error
    if result < 0:
        return 0
    else:
        return result
