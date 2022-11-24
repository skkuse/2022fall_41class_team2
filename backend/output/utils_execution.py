import docker
import os

from output.utils import generate_files, delete_files
from docker.errors import DockerException, ContainerError
from backend.exceptions import BadRequestError, InternalServerError

CONTAINER_CODE_DIR = os.environ['CONTAINER_CODE_DIR']

EXECUTED_FUNCTION_NAME = 'solution'

SUPPORT_LANGUAGE = ['python', 'javascript', 'c', 'cpp']

PYTHON_IMAGE = os.environ['PYTHON_IMAGE']
NODE_IMAGE = os.environ['NODE_IMAGE']
GCC_IMAGE = os.environ['GCC_IMAGE']


def run(base_dir: str, language: str, raw_code: str, raw_input: str, temporary: bool = True):
    language = language.lower()
    if language not in SUPPORT_LANGUAGE:
        raise BadRequestError(detail=f'{language} does not supported.')

    code_filename = None
    input_filename = None
    ret = None

    try:
        [code_filename, input_filename] = make_arguments(
            base_dir=base_dir,
            language=language,
            raw_code=raw_code,
            raw_input=raw_input,
        )

        if language == 'python':
            ret = execute_python(
                base_dir=base_dir,
                code_filename=code_filename,
                input_filename=input_filename,
            )
        elif language == 'javascript':
            ret = execute_javascript(
                base_dir=base_dir,
                code_filename=code_filename,
                input_filename=input_filename,
            )
        elif language == 'c':
            ret = execute_c(
                base_dir=base_dir,
                code_filename=code_filename,
                input_filename=input_filename,
            )
        elif language == 'cpp':
            ret = execute_cpp(
                base_dir=base_dir,
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

        ret = {
            'exit_status': e.exit_status,
            'output': output,
        }
    except DockerException as e:
        raise InternalServerError(detail=e)
    finally:
        if temporary:
            full_filenames = [base_dir + filename for filename in [code_filename, input_filename]]
            delete_files(full_filenames=full_filenames)
        else:
            ret.update({
                'code_filename': code_filename,
                'input_filename': input_filename,
            })
        return ret


def setup_python_code(raw_code: str):
    return '\n\n\n'.join([raw_code.strip(), f'{EXECUTED_FUNCTION_NAME}()'])


def setup_javascript_code(raw_code: str):
    return '\n\n'.join([raw_code.strip(), f'{EXECUTED_FUNCTION_NAME}()'])


def setup_c_code(raw_code: str):
    return '\n\n'.join([raw_code.strip(), f'int main() {{ {EXECUTED_FUNCTION_NAME}(); return 0; }}'])


def setup_cpp_code(raw_code: str):
    return '\n\n'.join([raw_code.strip(), f'int main() {{ {EXECUTED_FUNCTION_NAME}(); return 0; }}'])


def setup_input(raw_input: str):
    return raw_input.strip()


def make_arguments(base_dir: str, language: str, raw_code: str, raw_input: str = ""):
    filenames = []

    if raw_code:
        if language == 'python':
            [code_filename] = generate_files(
                base_dir=base_dir,
                contents=[setup_python_code(raw_code)],
                suffixes=['.py'],
            )
            filenames.append(code_filename)
        elif language == 'javascript':
            [code_filename] = generate_files(
                base_dir=base_dir,
                contents=[setup_javascript_code(raw_code)],
                suffixes=['.js'],
            )
            filenames.append(code_filename)
        elif language == 'c':
            [code_filename] = generate_files(
                base_dir=base_dir,
                contents=[setup_c_code(raw_code)],
                suffixes=['.c'],
            )
            filenames.append(code_filename)
        elif language == 'cpp':
            [code_filename] = generate_files(
                base_dir=base_dir,
                contents=[setup_cpp_code(raw_code)],
                suffixes=['.cpp'],
            )
            filenames.append(code_filename)

    if raw_input:
        [input_filename] = generate_files(
            base_dir=base_dir,
            contents=[setup_input(raw_input)],
            suffixes=['.txt'],
        )
        filenames.append(input_filename)

    return filenames


def execute_python(base_dir: str, code_filename: str, input_filename: str):
    return execute_container(
        base_dir=base_dir,
        image=PYTHON_IMAGE,
        command=f'sh -c "python {code_filename} < {input_filename}"'
    )


def execute_javascript(base_dir: str, code_filename: str, input_filename: str):
    return execute_container(
        base_dir=base_dir,
        image=NODE_IMAGE,
        command=f'sh -c "node {code_filename} < {input_filename}"',
    )


def execute_c(base_dir: str, code_filename: str, input_filename: str):
    return execute_container(
        base_dir=base_dir,
        image=GCC_IMAGE,
        command=f'sh -c "gcc -o main {code_filename} && ./main < {input_filename} && rm ./main"',
    )


def execute_cpp(base_dir: str, code_filename: str, input_filename: str):
    return execute_container(
        base_dir=base_dir,
        image=GCC_IMAGE,
        command=f'sh -c "g++ -o main {code_filename} && ./main < {input_filename} && rm ./main"',
    )


def execute_container(base_dir: str, image: str, command: str):
    client = docker.from_env()
    volumes = {
        base_dir: {'bind': CONTAINER_CODE_DIR, 'mode': 'rw'},
    }
    container = client.containers.run(
        image=image,
        command=command,
        volumes=volumes,
        working_dir=CONTAINER_CODE_DIR,
        remove=False,
        detach=True,
    )

    exit_status = container.wait()['StatusCode']
    if exit_status == 0:
        out = container.logs(stdout=True, stderr=False, stream=True, follow=True)
    else:
        out = container.logs(stdout=False, stderr=True)
    container.remove()
    if exit_status != 0:
        raise ContainerError(container, exit_status, command, image, out)

    response = b''.join([line for line in out])
    output = response.decode('utf-8').strip()

    return {
        'exit_status': exit_status,
        'output': output,
    }
    