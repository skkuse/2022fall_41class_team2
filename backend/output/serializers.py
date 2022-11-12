from rest_framework import serializers
from output.models import Result


class ResultSerializer(serializers.ModelSerializer):
    repo_id = serializers.IntegerField(write_only=True, required=False)
    references = serializers.DictField(child=serializers.ListField(child=serializers.URLField()))

    class Meta:
        model = Result
        fields = ['id', 'references', 'code_description', 'repo_id']
