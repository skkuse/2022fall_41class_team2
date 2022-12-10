from rest_framework import serializers
from output.models import Result, FunctionalityResult, EfficiencyResult, PlagiarismResult, ReadabilityResult


class TestcaseResultSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    is_hidden = serializers.BooleanField()
    input = serializers.CharField(allow_null=True)
    is_error = serializers.BooleanField()
    expected_output = serializers.CharField(allow_null=True)
    actual_output = serializers.CharField(allow_null=True)
    is_pass = serializers.BooleanField()

    def update(self, instance, validated_data): pass
    def create(self, validated_data): pass

    def to_representation(self, instance):
        return super().to_representation(instance=instance)


class TestcaseBlindResultSerializer(TestcaseResultSerializer):
    blind_fields = ['input', 'expected_output', 'actual_output']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if instance.get('is_hidden'):
            ret.update(
                (key, None) for key in ret.keys() if key in self.blind_fields
            )
        return ret


class FunctionalityResultSerializer(serializers.ModelSerializer):
    result_id = serializers.IntegerField(write_only=True)
    testcase_results = serializers.ListField(
        child=TestcaseResultSerializer(),
    )

    class Meta:
        model = FunctionalityResult
        fields = ['id', 'testcase_results', 'result_id']


class EfficiencyResultSerializer(serializers.ModelSerializer):
    result_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = EfficiencyResult
        fields = ['id', 'loc_score', 'control_flow_complexity_score',
                  'reservation_words_score', 'data_flow_complexity_score', 'result_id']


class PlagiarismResultSerializer(serializers.ModelSerializer):
    result_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = PlagiarismResult
        fields = ['id', 'num_files_compared', 'similarity_score', 'result_id']


class ReadabilityResultSerializer(serializers.ModelSerializer):
    result_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = ReadabilityResult
        fields = ['id', 'pylint_score', 'pycodestyle_score', 'mypy_score', 'result_id']


class ResultSerializer(serializers.ModelSerializer):
    repo_id = serializers.IntegerField(write_only=True)
    references = serializers.ListField(
        child=serializers.CharField(),
        required=False,
    )
    code_description = serializers.CharField(required=False, allow_blank=True)
    functionality_result = FunctionalityResultSerializer(read_only=True)
    efficiency_result = EfficiencyResultSerializer(read_only=True)
    plagiarism_result = PlagiarismResultSerializer(read_only=True)
    readability_result = ReadabilityResultSerializer(read_only=True)

    class Meta:
        model = Result
        fields = ['id', 'references', 'code_description', 'functionality_result', 'efficiency_result',
                  'plagiarism_result', 'readability_result', 'repo_id']
