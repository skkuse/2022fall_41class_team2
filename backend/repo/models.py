from django.db import models


class Repo(models.Model):
    author = models.ForeignKey('authentication.User', on_delete=models.PROTECT, related_name='repos')
    assignment = models.ForeignKey('assignment.Assignment', on_delete=models.PROTECT, related_name='repos')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    modified_at = models.DateTimeField(auto_now=True)
    content = models.JSONField(default=dict)

    class Meta:
        ordering = ['id', 'modified_at']

    def __str__(self):
        return self.id
