from rest_framework import serializers
from repo.models import Repo


class RepoSerializer(serializers.ModelSerializer):
    assignment_id = serializers.IntegerField(write_only=True, required=False)
    language = serializers.CharField(write_only=True, required=False)
    code = serializers.CharField(write_only=True, required=False)
    content = serializers.DictField(read_only=True, required=False)

    class Meta:
        model = Repo
        fields = ['id', 'created_at', 'modified_at', 'content', 'language', 'code', 'assignment_id']
