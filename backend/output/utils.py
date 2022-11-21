import os
import logging

from uuid import uuid4
from rest_framework import status
from rest_framework.exceptions import APIException

logger = logging.getLogger(__name__)


def generate_files(base_dir: str, contents: [str], suffixes: [str]):
    try:
        filenames = []
        for idx, content in enumerate(contents):
            if suffixes is None or suffixes[idx] is None:
                filename = str(uuid4())
            else:
                filename = ''.join([str(uuid4()), suffixes[idx]])

            with open(base_dir + filename, 'w') as file:
                file.write(content)

            filenames.append(filename)
        return filenames
    except Exception as e:
        logger.exception(e)
        raise APIException(detail='Generating files are failed.', code=status.HTTP_500_INTERNAL_SERVER_ERROR)


def delete_files(full_filenames: [str]):
    for full_filename in full_filenames:
        if os.path.isfile(full_filename):
            os.remove(full_filename)
