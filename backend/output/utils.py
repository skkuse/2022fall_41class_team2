import ast, traceback, docker
from backend.settings.base import BASE_DIR


SOURCE_CODE_DIR = f'{BASE_DIR}/output/tmp'


def execute_code(source_code: str = None):
    try:
        node = ast.parse(source_code)
        with open(SOURCE_CODE_DIR + '/my-script.py', 'w') as code_file:
            code_file.write(source_code)

        client = docker.from_env()
        volumes = {
            SOURCE_CODE_DIR: {'bind': '/usr/src/myapp', 'mode': 'ro'},
        }
        response = client.containers.run(
            "python:3",
            command='python my-script.py',
            volumes=volumes,
            working_dir='/usr/src/myapp',
            remove=True,
        )
        return response.decode('utf-8')
        # return ast.dump(node)
    except BaseException:
        return traceback.format_exc(), traceback.format_stack()
