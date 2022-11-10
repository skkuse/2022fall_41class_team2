from rest_framework import serializers
from testcase.models import Testcase


class TestcaseSerializer(serializers.ModelSerializer):
    assignment_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Testcase
        fields = ['id', 'created_at', 'is_hidden', 'input', 'output', 'assignment_id']
