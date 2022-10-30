from django.db import models


class Lecture(models.Model):
    name = models.CharField(max_length=255, default='', blank=False)
    instructor = models.ForeignKey('authentication.User', on_delete=models.PROTECT, related_name='lectures')

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
