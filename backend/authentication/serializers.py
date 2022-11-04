from rest_framework import serializers
from authentication.models import User


class UserSerializer(serializers.ModelSerializer):
    serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    class Meta:
        model = User
        fields = ['id', 'created_at', 'last_login', 'nickname', 'oauth_id', 'name', 'email',
                  'profile_image_url', 'github_api_url', 'github_profile_url']
