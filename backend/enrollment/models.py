from django.db import models

class Enrollment(models.Model):
    student = models.ForeignKey('authentication.User', on_delete=models.PROTECT, related_name='enrollments')
    lecture = models.ForeignKey('lecture.Lecture', on_delete=models.PROTECT, related_name='enrollments')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'{self.student.nickname} is enrolled at {self.lecture.name}'
