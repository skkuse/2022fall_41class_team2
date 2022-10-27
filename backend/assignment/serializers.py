from dataclasses import fields
from rest_framework import serializers, fields
from assignment.models import Assignment

class AssignmentSerializer(serializers.ModelSerializer):
    deadline = fields.DateField(input_formats =['%Y-%m-%dT%H:%M:%S.%fZ'])
    class Meta:
        model = Assignment
        fields = ['lecture_id', 'name', 'deadline', 'question', 
                  'constraints', 'skeleton_code']
    # Create and Return a new "Assignment" instance given the validated data
    def create(self, validated_data):
        return Assignment.objects.create(**validated_data)
    
    # Update and return an existing "Assignment" instance given the validated data
    def update(self, instance, validated_data):
        instance.lecture_id = validated_data.get('lecture_id', instance.lecture_id)
        instance.name = validated_data.get('name', instance.name)
        instance.deadline = validated_data.get('deadline', instance.deadline)
        instance.question = validated_data.get('question', instance.question)
        instance.constraints = validated_data.get('constraints', instance.constraints)
        instance.skeleton_code = validated_data.get('skeleton_code', instance.skeleton_code)
        #instance.answer_code = validated_data.get('answer_code', instance.answer_code)
        instance.save()
        return instance



