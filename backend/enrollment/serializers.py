from rest_framework import serializers
# from authentication.models import User
# from lecture.models import Lecture
from enrollment.models import Enrollment


class EnrollmentSerializer(serializers.ModelSerializer):
    serializers.PrimaryKeyRelatedField(many=True, queryset=Enrollment.objects.all())

    class Meta:
        model = Enrollment
        fields = ['enrollment_id', 'student_id', 'lecture_id', 'created_at']


        

        