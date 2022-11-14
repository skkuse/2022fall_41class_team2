import docker
import os
import logging

from uuid import uuid4
from rest_framework import status
from rest_framework.exceptions import APIException
from docker.errors import DockerException, ContainerError

from backend.settings.base import BASE_DIR

SERVER_CODE_DIR = str(BASE_DIR) + os.environ['SERVER_CODE_DIR']
CONTAINER_CODE_DIR = os.environ['CONTAINER_CODE_DIR']

EXECUTED_FUNCTION_NAME = 'solution'

SUPPORT_LANGUAGE = ['python', 'javascript', 'c', 'cpp']

PYTHON_IMAGE = os.environ['PYTHON_IMAGE']
NODE_IMAGE = os.environ['NODE_IMAGE']
GCC_IMAGE = os.environ['GCC_IMAGE']

logger = logging.getLogger(__name__)


def generate_files(contents: [str], prefixes=None):
    try:
        filenames = []
        for idx, content in enumerate(contents):
            if prefixes is None or prefixes[idx] is None:
                filename = str(uuid4())
            else:
                filename = ''.join([str(uuid4()), prefixes[idx]])

            with open(SERVER_CODE_DIR + filename, 'w') as file:
                file.write(content)

            filenames.append(filename)
        return filenames
    except Exception as e:
        logger.exception(e)
        raise APIException(detail='Generating files are failed.', code=status.HTTP_500_INTERNAL_SERVER_ERROR)


def delete_files(filenames: [str]):
    for filename in filenames:
        full_filename = SERVER_CODE_DIR + filename
        if os.path.isfile(full_filename):
            os.remove(full_filename)


def setup_python_code(raw_code: str):
    return '\n\n\n'.join([raw_code, f'{EXECUTED_FUNCTION_NAME}()'])


def setup_javascript_code(raw_code: str):
    return '\n\n'.join([raw_code, f'{EXECUTED_FUNCTION_NAME}()'])


def setup_c_code(raw_code: str):
    return '\n\n'.join([raw_code, f'int main() {{ {EXECUTED_FUNCTION_NAME}(); return 0; }}'])


def setup_cpp_code(raw_code: str):
    return '\n\n'.join([raw_code, f'int main() {{ {EXECUTED_FUNCTION_NAME}(); return 0; }}'])


def setup_input(raw_input: str):
    return raw_input.strip()


def run(language: str, raw_code: str, raw_input: str):
    language = language.lower()
    if language not in SUPPORT_LANGUAGE:
        raise APIException(detail=f'{language} does not supported.', code=status.HTTP_400_BAD_REQUEST)

    code_filename = None
    input_filename = None

    try:
        if language == 'python':
            [code_filename, input_filename] = generate_files([
                setup_python_code(raw_code),
                setup_input(raw_input),
            ])
            return execute_python(
                code_filename=code_filename,
                input_filename=input_filename,
            )
        elif language == 'javascript':
            [code_filename, input_filename] = generate_files([
                setup_javascript_code(raw_code),
                setup_input(raw_input),
            ])
            return execute_javascript(
                code_filename=code_filename,
                input_filename=input_filename,
            )
        elif language == 'c':
            [code_filename, input_filename] = generate_files([
                setup_c_code(raw_code),
                setup_input(raw_input),
            ], prefixes=['.c', ''])
            return execute_c(
                code_filename=code_filename,
                input_filename=input_filename,
            )
        elif language == 'cpp':
            [code_filename, input_filename] = generate_files([
                setup_cpp_code(raw_code),
                setup_input(raw_input),
            ], prefixes=['.cpp', ''])
            return execute_cpp(
                code_filename=code_filename,
                input_filename=input_filename,
            )
    except ContainerError as e:
        byte = e.stderr
        if not isinstance(byte, bytes):
            byte = '\n'.encode()
        output = byte.decode('utf-8')

        output = output.replace(code_filename, 'code')
        output = output.replace(input_filename, 'input')

        return {
            'exit_status': e.exit_status,
            'output': output,
        }
    except DockerException as e:
        logger.exception(e)
        raise APIException(detail='Docker engine exception is occur.', code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    finally:
        delete_files(filenames=[code_filename, input_filename])


def execute_python(code_filename: str, input_filename: str):
    return execute_container(
        image=PYTHON_IMAGE,
        command=f'sh -c "python {code_filename} < {input_filename}"'
    )


def execute_javascript(code_filename: str, input_filename: str):
    return execute_container(
        image=NODE_IMAGE,
        command=f'sh -c "node {code_filename} < {input_filename}"',
    )


def execute_c(code_filename: str, input_filename: str):
    return execute_container(
        image=GCC_IMAGE,
        command=f'sh -c "gcc -o main {code_filename} && ./main < {input_filename} && rm ./main"',
    )


def execute_cpp(code_filename: str, input_filename: str):
    return execute_container(
        image=GCC_IMAGE,
        command=f'sh -c "g++ -o main {code_filename} && ./main < {input_filename} && rm ./main"',
    )


def execute_container(image: str, command: str):
    client = docker.from_env()
    volumes = {
        SERVER_CODE_DIR: {'bind': CONTAINER_CODE_DIR, 'mode': 'rw'},
    }
    response = client.containers.run(
        image=image,
        command=command,
        volumes=volumes,
        working_dir=CONTAINER_CODE_DIR,
        remove=True,
        detach=False,
    )

    return {
        'exit_status': 0,
        'output': response.decode('utf-8'),
    }
    