from rest_framework import serializers
from assignment.models import Assignment
from testcase.models import Testcase


class ContentSerializer(serializers.Serializer):
    language = serializers.CharField()
    skeleton_code = serializers.CharField()
    answer_code = serializers.CharField()

    def update(self, instance, validated_data): pass
    def create(self, validated_data): pass

    def to_representation(self, instance):
        return super().to_representation(instance=instance)


class TestcaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Testcase
        fields = ['id', 'created_at', 'input', 'output', 'is_hidden']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if instance.is_hidden:
            ret.update(
                (key, None) for key in ret.keys() if key != 'is_hidden'
            )
        return ret


class AssignmentSerializer(serializers.ModelSerializer):
    lecture_id = serializers.IntegerField(write_only=True)
    contents = serializers.ListField(
        child=ContentSerializer(),
    )
    testcases = TestcaseSerializer(many=True, read_only=True)

    class Meta:
        model = Assignment
        fields = ['id', 'name', 'deadline', 'question', 'constraints',
                  'contents', 'testcases', 'lecture_id']

