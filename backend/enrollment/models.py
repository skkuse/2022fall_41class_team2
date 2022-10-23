from django.db import models

class Enrollment(models.Model):
    student_id = models.ForeignKey('authentication.User', on_delete=models.PROTECT, related_name='enrollment')
    lecture_id = models.ForeignKey('lecture.Lecture', on_delete=models.PROTECT, related_name='enrollment')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    

    class Meta:
        ordering = ['lecture_id', 'created_at']

    def __str__(self):
        return self.lecture_id