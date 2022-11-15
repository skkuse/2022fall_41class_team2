import tempfile
import re

from copydetect import CopyDetector
from bs4 import BeautifulSoup
from output.models import Result
from output.serializers import PlagiarismResultSerializer

DISPLAY_THRESHOLD = 0.5
NUM_FILES_COMPARED_FIELD = 'num_files_compared'
SIMILARITY_FIELD = 'similarity_score'


def run(result: Result, filename: str, test_dir: str, ref_dir: str):
    plagiarism_output = execute_copy_detector(
        filename=filename,
        test_dirs=[test_dir],
        ref_dirs=[ref_dir],
    )

    data = dict({
        'result_id': result.id,
    })
    data.update(plagiarism_output)

    plag_serialize = PlagiarismResultSerializer(data=data)
    plag_serialize.is_valid(raise_exception=True)
    plag_serialize.save()

    return plag_serialize.data


def execute_copy_detector(filename: str, test_dirs: [str], ref_dirs: [str]):
    # Make a temporary file to store the contents of the html report
    temp_report = tempfile.NamedTemporaryFile()

    # Initialize CopyDetector
    detector = CopyDetector(
        test_dirs=test_dirs,
        ref_dirs=ref_dirs,
        out_file=temp_report.name,
        display_t=DISPLAY_THRESHOLD,
    )
    detector.add_file(filename)
    detector.run()
    detector.generate_html_report()

    # BeautifulSoup HTML Parsing
    with open(f'{temp_report.name}.html', 'r') as fp:
        soup = BeautifulSoup(fp, "html.parser")
    soup.get_text()

    # Get the number of files compared (int)
    num_of_files_string = soup.find("p").find_next("p").contents[2].strip()
    num_files = int(''.join(filter(str.isdigit, num_of_files_string)))

    # Get the similarity score (float)
    similarity_string = soup.find("p").find_next("p").contents[4].strip()
    sim_score = [float(s) for s in re.findall(r'\d+\.\d+', similarity_string)]

    return {
        NUM_FILES_COMPARED_FIELD: num_files,
        SIMILARITY_FIELD: sim_score[0],
    }
