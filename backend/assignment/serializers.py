from rest_framework import serializers, fields
from assignment.models import Assignment
from lecture.models import Lecture
from authentication.models import User


class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'profile_image_url']


class LectureSerializer(serializers.ModelSerializer):
    instructor = InstructorSerializer(read_only=True)

    class Meta:
        model = Lecture
        fields = ['id', 'name', 'instructor']


class AssignmentSerializer(serializers.ModelSerializer):
    lecture = LectureSerializer(read_only=True)

    class Meta:
        model = Assignment
        fields = ['id', 'lecture', 'name', 'deadline', 'question',
                  'constraints', 'skeleton_code', 'answer_code']

