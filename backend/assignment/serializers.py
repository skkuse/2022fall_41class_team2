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

    '''
    @seungho
    If you use default `create` function, just use default instead overriding
    '''
    # Create and Return a new "Assignment" instance given the validated data
    # def create(self, validated_data):
    #     return Assignment.objects.create(**validated_data)

    '''
    @seungho
    There is no need to implement update function
    '''
    # Update and return an existing "Assignment" instance given the validated data
    # def update(self, instance, validated_data):
    #     instance.lecture = validated_data.get('lecture', instance.lecture)
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.deadline = validated_data.get('deadline', instance.deadline)
    #     instance.question = validated_data.get('question', instance.question)
    #     instance.constraints = validated_data.get('constraints', instance.constraints)
    #     instance.skeleton_code = validated_data.get('skeleton_code', instance.skeleton_code)
    #     # instance.answer_code = validated_data.get('answer_code', instance.answer_code)
    #     instance.save()
    #     return instance
