from rest_framework import serializers
from output.models import Result, FunctionalityResult


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


class ResultSerializer(serializers.ModelSerializer):
    repo_id = serializers.IntegerField(write_only=True)
    references = serializers.DictField(
        child=serializers.ListField(child=serializers.URLField()),
        required=False,
        read_only=True,
    )
    code_description = serializers.CharField(read_only=True)
    functionality_result = FunctionalityResultSerializer(read_only=True)

    class Meta:
        model = Result
        fields = ['id', 'references', 'code_description', 'functionality_result', 'repo_id']

