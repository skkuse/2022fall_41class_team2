from rest_framework import serializers
from enrollment.models import Enrollment


class EnrollmentSerializer(serializers.ModelSerializer):
    lecture_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'created_at', 'lecture_id']
