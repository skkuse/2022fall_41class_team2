from rest_framework import serializers
from authentication.models import User


class UserSerializer(serializers.ModelSerializer):
    serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    class Meta:
        model = User
        fields = ['id', 'created_at', 'last_login', 'name', 'email', 'nickname', 'profile_image_url', 'github_api_url']
