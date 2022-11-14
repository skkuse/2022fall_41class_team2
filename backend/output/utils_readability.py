import os, json, re
from output.models import Result
from output.serializers import ReadabilityResultSerializer
from backend.settings.base import BASE_DIR

SERVER_CODE_DIR = str(BASE_DIR) + os.environ['SERVER_CODE_DIR']

filename = "utils_readability_code.py"

def execute_pylint(filename: str):
    full_filename = SERVER_CODE_DIR + filename
    terminal_command = f"pylint {full_filename}" 
    stream = os.popen(terminal_command)
    output = stream.read()
    result = float(re.findall(r'\d+.\d+', output.split('\n')[-3])[0])
    return result

def execute_pycodestyle(filename: str):
    full_filename = SERVER_CODE_DIR + filename
    terminal_command = f"pycodestyle --count {full_filename}" 
    stream = os.popen(terminal_command)
    output = stream.read()
    error = len(output.split('\n')) - 1
    result = 10 - error
    if result < 0:
        return 0
    else:
        return result

def execute_mypy(filename: str):
    full_filename = SERVER_CODE_DIR + filename
    terminal_command = f"mypy {full_filename}" 
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

def run(code: str, result: Result):
    with open(SERVER_CODE_DIR + filename, 'w') as file:
        file.write(code)

    readability_serialize = ReadabilityResultSerializer(
        data={
            'result_id': result.id,
            'pylint_score': execute_pylint(filename),
            'pycodestyle_score': execute_pycodestyle(filename),
            'mypy_score': execute_mypy(filename)
        }
    )

    readability_serialize.is_valid(raise_exception=True)
    readability_serialize.save()

    return readability_serialize.data
#    return (json.dumps(readability_serialize.data))