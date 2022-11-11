from rest_framework import serializers
from assignment.models import Assignment
from testcase.models import Testcase


class TestcaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Testcase
        fields = ['id', 'created_at', 'input', 'output']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if instance.is_hidden:
            ret.update(
                (key, None) for key in ret.keys()
            )
        return ret


class AssignmentSerializer(serializers.ModelSerializer):
    lecture_id = serializers.IntegerField(write_only=True)
    testcases = TestcaseSerializer(many=True, read_only=True)

    class Meta:
        model = Assignment
        fields = ['id', 'name', 'deadline', 'question', 'constraints',
                  'skeleton_code', 'answer_code', 'testcases', 'lecture_id']

