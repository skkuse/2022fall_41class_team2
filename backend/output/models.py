from django.db import models


class Result(models.Model):
    repo = models.ForeignKey('repo.Repo', on_delete=models.PROTECT, related_name='results')
    references = models.JSONField(default=dict)
    code_description = models.TextField(default="")

    class Meta:
        ordering = ['id', 'repo_id']

    def __str__(self):
        return self.id


class FunctionalityResult(models.Model):
    result = models.OneToOneField('output.Result', on_delete=models.PROTECT, related_name='functionality_result')
    testcase_results = models.JSONField(default=list)


# TODO @동우
class ReadabilityResult(models.Model):
    result = models.OneToOneField('output.Result', on_delete=models.PROTECT, related_name='readability_result')


# TODO @영준
class EfficiencyResult(models.Model):
    result = models.OneToOneField('output.Result', on_delete=models.PROTECT, related_name='efficiency_result')


# TODO @영준
class PlagiarismResult(models.Model):
    result = models.OneToOneField('output.Result', on_delete=models.PROTECT, related_name='plagiarism_result')
