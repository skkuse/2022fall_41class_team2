from django.db import models


class Assignment(models.Model):
    lecture = models.ForeignKey('lecture.Lecture', on_delete=models.PROTECT, related_name='assignments')
