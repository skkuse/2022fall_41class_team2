import json
import os
import subprocess
from models import EfficiencyResult
# from backend.settings.base import BASE_DIR

# SERVER_CODE_DIR = str(BASE_DIR) + os.environ['SERVER_CODE_DIR']
# # todo: where do these values get saved? 
# #         ans: into the model (make a model with those int field)
# # todo: ask TA about getting the "data flow complexity score"
def run(filename, result):
# filename=r"C:\Users\skdan\Documents\2022 Fall\Capstone Design\dataset\Project_CodeNet_Python800\p00001\s001603790.py"
    process = subprocess.run(['multimetric', f'{filename}'], stdout=subprocess.PIPE, universal_newlines=True)

    output = process.stdout
    output_json = json.loads(output)

    sloc_score = output_json['overall']['loc']

    cf_complexity_score = output_json['overall']['cyclomatic_complexity']
    r_words_score = output_json['overall']['operands_uniq']

    # tiobe complexity is just an averaged cyclomatic complexity, but displayed in a range of 0 - 100
    df_complexity_score = output_json['overall']['tiobe_complexity']

    # Save various scores into an "Efficiency" object
    EfficiencyResult.objects.create(
        result = result,
        loc_score = sloc_score,
        control_flow_complexity_score = cf_complexity_score,
        reservation_words_score = r_words_score,
        data_flow_complexity_score = df_complexity_score,
    )
