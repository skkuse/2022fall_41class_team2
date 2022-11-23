from django.db import models


class Testcase(models.Model):
    assignment = models.ForeignKey('assignment.Assignment', on_delete=models.CASCADE, related_name='testcases')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    is_hidden = models.BooleanField(default=True)
    input = models.TextField(default="")
    output = models.TextField(default="")

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return self.id
