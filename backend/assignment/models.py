# Todo: would TextField() be more appropriate for skeleton_code and answer_code?

from django.db import models


class Assignment(models.Model):

    lecture_id = models.ForeignKey('lecture.Lecture', on_delete=models.PROTECT, related_name='assignments')
    name = models.CharField(max_length = 255, blank = True, default='')
    deadline = models.DateTimeField()
    question = models.CharField(max_length = 255, blank = True, default = '')
    constraints = models.CharField(max_length = 255, blank = True, default = '')
    skeleton_code = models.CharField(max_length = 255, blank = True, default = '')
    #answer_code = models.CharField(max_length = 255, blank = True, default = '')
    
    class Meta:
        ordering = ['lecture_id']
