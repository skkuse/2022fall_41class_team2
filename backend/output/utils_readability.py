import os
import re

from output.serializers import ReadabilityResultSerializer


def run(result_id: int, full_filename: str):
    pylint_score = execute_pylint(full_filename=full_filename)
    pycodestyle_score = execute_pycodestyle(full_filename=full_filename)
    mypy_score = execute_mypy(full_filename=full_filename)

    serializer = ReadabilityResultSerializer(data={
        'result_id': result_id,
        'pylint_score': pylint_score,
        'pycodestyle_score': pycodestyle_score,
        'mypy_score': mypy_score,
    })
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return serializer.data


def execute_pylint(full_filename: str):
    terminal_command = f'pylint {full_filename}'
    stream = os.popen(terminal_command)
    output = stream.read()
    result = float(re.findall(r'\d+.\d+', output.split('\n')[-3])[0])
    return result


def execute_pycodestyle(full_filename: str):
    terminal_command = f'pycodestyle --count {full_filename}'
    stream = os.popen(terminal_command)
    output = stream.read()
    error = len(output.split('\n')) - 1
    result = 10 - error
    if result < 0:
        return 0
    else:
        return result


def execute_mypy(full_filename: str):
    terminal_command = f'mypy {full_filename}'
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
