from django.db import models


class Lecture(models.Model):
    instructor = models.ForeignKey('authentication.User', on_delete=models.PROTECT, related_name='lectures')
