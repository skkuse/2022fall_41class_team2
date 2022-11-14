import json
import subprocess
from output.models import Result
from output.serializers import EfficiencyResultSerializer

# todo: ask TA about getting the "data flow complexity score"
#       email sent -> awaiting response
# todo: ask TA about the meaning of reservation words score
#       email sent -> awaiting response
def run(filename, result: Result):
    # Run multimetric on a given file path
    process = subprocess.run(['multimetric', f'{filename}'], stdout=subprocess.PIPE, universal_newlines=True)

    output = process.stdout
    output_json = json.loads(output)

    sloc_score = output_json['overall']['loc']

    cf_complexity_score = output_json['overall']['cyclomatic_complexity']
    r_words_score = output_json['overall']['operands_uniq']

    # tiobe complexity is just an averaged cyclomatic complexity, but displayed in a range of 0 - 100
    df_complexity_score = output_json['overall']['tiobe_complexity']

    # Serialize the results and save them
    eff_serialize = EfficiencyResultSerializer(data={
        'result_id': result.id,
        'loc_score': sloc_score,
        'control_flow_complexity_score': cf_complexity_score,
        'reservation_words_score': r_words_score,
        'data_flow_complexity_score': df_complexity_score, 
    })
    eff_serialize.is_valid(raise_exception=True)
    eff_serialize.save()

    return eff_serialize.data