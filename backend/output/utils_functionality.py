from output import utils_execution
from assignment.models import Assignment
from testcase.models import Testcase
from output.models import Result
from output.serializers import TestcaseResultSerializer, FunctionalityResultSerializer


def run(result: Result, assignment: Assignment, language: str, raw_code: str):
    testcases = Testcase.objects.filter(assignment=assignment).all()
    testcase_results = generate_testcase_results(
        language=language,
        raw_code=raw_code,
        testcases=testcases,
    )

    serializer = FunctionalityResultSerializer(data={
        'result_id': result.id,
        'testcase_results': testcase_results,
    })
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return serializer.data


def generate_testcase_results(language: str, raw_code: str, testcases: [Testcase]):
    ret = list()
    for idx, testcase in enumerate(testcases):
        execution_result = utils_execution.run(
            language=language,
            raw_code=raw_code,
            raw_input=testcase.input,
        )
        if execution_result.get('exit_status') == 0:
            actual_output = execution_result.get('output')
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
