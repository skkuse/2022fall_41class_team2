from django.db import models


class Repo(models.Model):
    author = models.ForeignKey('authentication.User', on_delete=models.PROTECT, related_name='repos')
    assignment = models.ForeignKey('assignment.Assignment', on_delete=models.PROTECT, related_name='repos')
