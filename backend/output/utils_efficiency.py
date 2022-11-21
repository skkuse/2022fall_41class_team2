import json
import subprocess

from output.serializers import EfficiencyResultSerializer

LOC_FIELD = 'loc_score'
CONTROL_FLOW_COMPLEXITY_FIELD = 'control_flow_complexity_score'
RESERVATION_WORDS_FIELD = 'reservation_words_score'
DATA_FLOW_COMPLEXITY_FIELD = 'data_flow_complexity_score'

# todo: incorrect data flow complexity score is being used
#       for the purposes of a working module. Will apply appropriate 
#       changes upon TA's email reply 
#       -yj(11/21) 

def run(result_id: int, full_filename: str):
    multimetric_output = execute_multimetric(full_filename=full_filename)

    data = dict({
        'result_id': result_id,
    })
    data.update(multimetric_output)

    serializer = EfficiencyResultSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return serializer.data


def execute_multimetric(full_filename: str):
    # Run multimetric on a given file path
    process = subprocess.run(
        ['multimetric', f'{full_filename}'],
        stdout=subprocess.PIPE,
        universal_newlines=True
    )

    output = process.stdout
    output_json = json.loads(output)

    # tiobe complexity is just an averaged cyclomatic complexity, but displayed in a range of 0 - 100
    df_complexity_score = output_json['overall']['tiobe_complexity']
    sloc_score = output_json['overall']['loc']
    cf_complexity_score = output_json['overall']['cyclomatic_complexity']
    r_words_score = output_json['overall']['halstead_difficulty']

    return {
        LOC_FIELD: sloc_score,
        CONTROL_FLOW_COMPLEXITY_FIELD: cf_complexity_score,
        RESERVATION_WORDS_FIELD: r_words_score,
        DATA_FLOW_COMPLEXITY_FIELD: df_complexity_score,
    }
