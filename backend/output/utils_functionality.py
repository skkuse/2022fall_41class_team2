from output import utils_execution
from testcase.models import Testcase
from output.serializers import TestcaseResultSerializer, FunctionalityResultSerializer


def run(result_id: int, testcases: [Testcase], base_dir: str, language: str, raw_code: str):
    testcase_results = generate_testcase_results(
        base_dir=base_dir,
        language=language,
        raw_code=raw_code,
        testcases=testcases,
    )

    serializer = FunctionalityResultSerializer(data={
        'result_id': result_id,
        'testcase_results': testcase_results,
    })
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return serializer.data


def generate_testcase_results(base_dir: str, language: str, raw_code: str, testcases: [Testcase]):
    ret = list()
    for idx, testcase in enumerate(testcases):
        execution_output = utils_execution.run(
            base_dir=base_dir,
            language=language,
            raw_code=raw_code,
            raw_input=testcase.input,
        )
        if execution_output.get('exit_status') == 0:
            actual_output = execution_output.get('output')
            is_error = False
            is_pass = (actual_output == testcase.output)
        else:
            actual_output = None
            is_error = True
            is_pass = False

        if testcase.is_hidden:
            testcase_input = None
            expected_output = None
            actual_output = None
        else:
            testcase_input = testcase.input
            expected_output = testcase.output

        data = TestcaseResultSerializer(instance={
            'is_hidden': testcase.is_hidden,
            'input': testcase_input,
            'expected_output': expected_output,
            'actual_output': actual_output,
            'is_error': is_error,
            'is_pass': is_pass,
        }).data
        ret.append(data)

    return ret
