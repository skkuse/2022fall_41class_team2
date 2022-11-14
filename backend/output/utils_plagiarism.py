from copydetect import CopyDetector
from bs4 import BeautifulSoup
import tempfile
import re
from output.models import Result
from output.serializers import PlagiarismResultSerializer


def run(filename, result: Result, test_dir, ref_dir):
    # Make a temporary file to store the contents of the html report
    temp_report = tempfile.NamedTemporaryFile()

    # Initialize CopyDetector
    detector = CopyDetector(test_dirs=[test_dir], ref_dirs=[ref_dir], display_t=0.5, out_file=temp_report.name)
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

    # Serialize num_files and sim_score
    plag_serialize = PlagiarismResultSerializer(data={
        'result_id': result.id,
        'num_files_compared': num_files,
        'similarity_score': sim_score[0],
    })

    plag_serialize.is_valid(raise_exception=True)
    plag_serialize.save()

    return plag_serialize.data