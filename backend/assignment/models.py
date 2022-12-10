from django.db import models
from django.utils import timezone


class Assignment(models.Model):
    lecture = models.ForeignKey('lecture.Lecture', on_delete=models.PROTECT, related_name='assignments')
    name = models.CharField(max_length=255, blank=True, default='')
    deadline = models.DateTimeField(blank=True, default=timezone.now)
    question = models.TextField(blank=True, default='')
    constraints = models.TextField(blank=True, default='')
    contents = models.JSONField(default=list)
    references = models.JSONField(default=list)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f'[{self.id}] {self.name}'
