import json
import subprocess
from output.models import Result
from output.serializers import EfficiencyResultSerializer

LOC_FIELD = 'loc_score'
CONTROL_FLOW_COMPLEXITY_FIELD = 'control_flow_complexity_score'
RESERVATION_WORDS_FIELD = 'reservation_words_score'
DATA_FLOW_COMPLEXITY_FIELD = 'data_flow_complexity_score'


# todo: ask TA about getting the "data flow complexity score"
#       email sent -> awaiting response
# todo: ask TA about the meaning of reservation words score
#       email sent -> awaiting response
def run(result: Result, filename: str):
    multimetric_output = execute_multimetric(filename=filename)

    data = dict({
        'result_id': result.id,
    })
    data.update(multimetric_output)

    serializer = EfficiencyResultSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return serializer.data


def execute_multimetric(filename: str):
    # Run multimetric on a given file path
    process = subprocess.run(
        ['multimetric', f'{filename}'],
        stdout=subprocess.PIPE,
        universal_newlines=True
    )

    output = process.stdout
    output_json = json.loads(output)

    # tiobe complexity is just an averaged cyclomatic complexity, but displayed in a range of 0 - 100
    df_complexity_score = output_json['overall']['tiobe_complexity']
    sloc_score = output_json['overall']['loc']
    cf_complexity_score = output_json['overall']['cyclomatic_complexity']
    r_words_score = output_json['overall']['operands_uniq']

    return {
        LOC_FIELD: sloc_score,
        CONTROL_FLOW_COMPLEXITY_FIELD: cf_complexity_score,
        RESERVATION_WORDS_FIELD: r_words_score,
        DATA_FLOW_COMPLEXITY_FIELD: df_complexity_score,
    }
