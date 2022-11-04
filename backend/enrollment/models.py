from django.db import models

'''
@seungho
Modify `Enrollment` field name to more proper meaning
student_id -> student
lecture_id -> lecture

Modify each FK field's related name to existing
enrollment -> enrollments

Modify __str__() function
'''


class Enrollment(models.Model):
    student = models.ForeignKey('authentication.User', on_delete=models.PROTECT, related_name='enrollments')
    lecture = models.ForeignKey('lecture.Lecture', on_delete=models.PROTECT, related_name='enrollments')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'{self.student.nickname} is enrolled at {self.lecture.name}'
