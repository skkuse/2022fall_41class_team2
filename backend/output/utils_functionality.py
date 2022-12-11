from output import utils_execution
from testcase.models import Testcase
from output.serializers import TestcaseResultSerializer, TestcaseBlindResultSerializer, FunctionalityResultSerializer
from output.utils import string_compare_considered_type


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


def generate_testcase_results(base_dir: str, language: str, raw_code: str, testcases: [Testcase], blind: bool = False):
    ret = list()
    for idx, testcase in enumerate(testcases):
        execution_output = utils_execution.run(
            base_dir=base_dir,
            language=language,
            raw_code=raw_code,
            raw_input=testcase.input,
        )

        is_error = True
        testcase_input = None
        expected_output = None
        actual_output = None
        is_pass = False

        if execution_output.get('exit_status') == 0:
            is_error = False
            testcase_input = testcase.input
            expected_output = testcase.output
            actual_output = execution_output.get('output')
            is_pass = string_compare_considered_type(actual_output, expected_output)

        instance = {
            'id': testcase.id,
            'is_hidden': testcase.is_hidden,
            'input': testcase_input,
            'expected_output': expected_output,
            'actual_output': actual_output,
            'is_error': is_error,
            'is_pass': is_pass,
        }

        if blind:
            serializer = TestcaseBlindResultSerializer(instance=instance)
        else:
            serializer = TestcaseResultSerializer(instance=instance)
        ret.append(serializer.data)

    return ret
