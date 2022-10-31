from rest_framework import serializers
from authentication.models import User
from lecture.models import Lecture


class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'profile_image_url']


class LectureSerializer(serializers.ModelSerializer):
    instructor = InstructorSerializer(read_only=True)
    is_instructor = serializers.SerializerMethodField()
    is_student = serializers.SerializerMethodField()

    class Meta:
        model = Lecture
        fields = ['id', 'name', 'instructor', 'is_instructor', 'is_student']

    def get_is_instructor(self, lecture) -> bool:
        user = self.context.get('request').user
        if user.is_anonymous or user is None:
            return False
        else:
            return lecture.instructor == user

    def get_is_student(self, lecture) -> bool:
        user = self.context.get('request').user
        if user.is_anonymous or user is None:
            return False
        else:
            return lecture.enrollments.filter(student=user).exists()
