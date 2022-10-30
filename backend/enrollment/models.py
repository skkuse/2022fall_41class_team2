from django.db import models


class Enrollment(models.Model):
    student = models.ForeignKey('authentication.User', on_delete=models.PROTECT, related_name='enrollments')
    lecture = models.ForeignKey('lecture.Lecture', on_delete=models.PROTECT, related_name='enrollments')
