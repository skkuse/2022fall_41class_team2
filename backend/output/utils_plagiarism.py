import os
from copydetect import CopyDetector
from bs4 import BeautifulSoup
import tempfile
import re
from models import PlagiarismResult


# todo: make a model with two json keyfields (num of referenced files, similarity)

def run(filename, result, test_dir, ref_dir):
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
    # "filter" is fine for int; no need to utilize regexp
    num_files = int(''.join(filter(str.isdigit, num_of_files_string)))

    # Get the similarity score (float)
    similarity_string = soup.find("p").find_next("p").contents[4].strip()
    sim_score = [float(s) for s in re.findall(r'\d+\.\d+', similarity_string)]

    # Save num_files and sim_score into a Plagiarism object
    PlagiarismResult.objects.create(
        result = result,
        num_files_compared = num_files,
        similarity_score = sim_score
    )
