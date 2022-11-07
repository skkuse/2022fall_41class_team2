from django.db import models
from django.utils import timezone


class Assignment(models.Model):
    lecture = models.ForeignKey('lecture.Lecture', on_delete=models.PROTECT, related_name='assignments')
    name = models.CharField(max_length=255, blank=True, default='')
    deadline = models.DateTimeField(blank=True, default=timezone.now)
    question = models.CharField(max_length=255, blank=True, default='')
    constraints = models.CharField(max_length=255, blank=True, default='')
    skeleton_code = models.TextField(blank=True, default='')
    answer_code = models.TextField(blank=True, default='')

    class Meta:
        ordering = ['name']
