from rest_framework import serializers
from output.models import Result, FunctionalityResult, EfficiencyResult, PlagiarismResult, ReadabilityResult


class TestcaseResultSerializer(serializers.Serializer):
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
    references = serializers.DictField(
        child=serializers.ListField(child=serializers.URLField()),
        required=False,
        read_only=True,
    )
    code_description = serializers.CharField(read_only=True)
    functionality_result = FunctionalityResultSerializer(read_only=True)
    efficiency_result = EfficiencyResultSerializer(read_only=True)
    plagiarism_result = PlagiarismResultSerializer(read_only=True)

    class Meta:
        model = Result
        fields = ['id', 'references', 'code_description', 'functionality_result', 'efficiency_result', 'plagiarism_result', 'repo_id']

