from rest_framework import serializers
from enrollment.models import Enrollment
from lecture.models import Lecture
from authentication.models import User


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'nickname', 'name', 'email', 'profile_image_url']


class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'nickname', 'name', 'email', 'profile_image_url']


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


class EnrollmentSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    lecture = LectureSerializer(read_only=True)
    """
    @seungho
    Why do you declare following line?
    """
    # serializers.PrimaryKeyRelatedField(many=True, queryset=Enrollment.objects.all())

    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'lecture', 'created_at']
