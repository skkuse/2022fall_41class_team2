from django.db import models


class Testcase(models.Model):
    assignment = models.ForeignKey('assignment.Assignment', on_delete=models.PROTECT, related_name='testcases')
