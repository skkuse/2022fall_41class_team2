import docker
import os
import tempfile

from uuid import uuid4
from docker.errors import DockerException, ContainerError

from backend.settings.base import BASE_DIR

SERVER_CODE_DIR = str(BASE_DIR) + os.environ['SERVER_CODE_DIR']
CONTAINER_CODE_DIR = os.environ['CONTAINER_CODE_DIR']
PYTHON_IMAGE = os.environ['PYTHON_IMAGE']
NODE_IMAGE = os.environ['NODE_IMAGE']

SUPPORT_LANGUAGE = ['python', 'javascript']


def execute_code(language: str, code: str, *args):
    language = language.lower()

    if language not in SUPPORT_LANGUAGE:
        raise Exception

    if language == 'python':
        return execute_python(code, *args)
    if language == 'javascript':
        return execute_javascript(code, *args)


def execute_python(code: str, *args):
    # TODO modify to use temporary file
    try:
        executable_code = setup_python_code(code, *args)

        tempfile.NamedTemporaryFile()
        with tempfile.TemporaryFile() as file:
            file.write(executable_code)

        filename = str(uuid4())
        with open(SERVER_CODE_DIR + filename, 'w') as file:
            file.write(executable_code)

        client = docker.from_env()
        volumes = {
            SERVER_CODE_DIR: {'bind': CONTAINER_CODE_DIR, 'mode': 'ro'},
        }

        response = client.containers.run(
            image=PYTHON_IMAGE,
            command=f'python {filename}',
            volumes=volumes,
            working_dir=CONTAINER_CODE_DIR,
            remove=True,
        )
        return {
            'exit_status': 0,
            'out': response.decode('utf-8'),
        }
    except ContainerError as e:
        byte = e.stderr
        if not isinstance(byte, bytes):
            byte = '\n'.encode()
        outs = byte.decode('utf-8').split('\n', 1)

        tmp = outs[0].split(' ')[-1]
        line_num = int(tmp) if tmp.isnumeric() else None
        err_msg = outs[1]

        return {
            'exit_status': e.exit_status,
            'out': {
                'line_number': line_num,
                'error_message': err_msg,
            },
        }
    except DockerException as e:
        raise e


def execute_javascript(code: str, *args):
    # TODO modify to use temporary file
    try:
        filename = 'script.js'
        with open(SERVER_CODE_DIR + filename, 'w') as file:
            file.write(code)

        client = docker.from_env()
        volumes = {
            SERVER_CODE_DIR: {'bind': CONTAINER_CODE_DIR, 'mode': 'ro'},
        }

        response = client.containers.run(
            NODE_IMAGE,
            command='node ' + filename,
            volumes=volumes,
            working_dir=CONTAINER_CODE_DIR,
            remove=True,
        )
        return response.decode('utf-8')
    except DockerException as e:
        print(e)
        raise e


def setup_python_code(code: str, *args):
    params = make_params(*args)
    return '\n\n\n'.join([code, f'print(solution({params}))'])


def make_params(*args):
    params = str()
    for raw in args:
        if isinstance(raw, (int, float, complex)):
            params += f'{raw},'
        elif isinstance(raw, str):
            params += f'\'{raw}\','
        elif isinstance(raw, list):
            params += f'[{make_params(raw)}],'
        else:
            raise Exception
    return params[:len(params) - 1]

