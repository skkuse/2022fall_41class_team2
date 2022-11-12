from django.db import models


class Result(models.Model):
    repo = models.ForeignKey('repo.Repo', on_delete=models.PROTECT, related_name='results')
    references = models.JSONField(default=dict)
    # TODO @동우
    code_description = models.TextField(default="")


class FunctionalityResult(models.Model):
    result = models.OneToOneField('output.Result', on_delete=models.PROTECT, related_name='functionality_result')
    testcase_results = models.JSONField(default=dict)


# TODO @동우
class ReadabilityResult(models.Model):
    result = models.OneToOneField('output.Result', on_delete=models.PROTECT, related_name='readability_result')


# TODO @영준
class EfficiencyResult(models.Model):
    result = models.OneToOneField('output.Result', on_delete=models.PROTECT, related_name='efficiency_result')


# TODO @영준
class PlagiarismResult(models.Model):
    result = models.OneToOneField('output.Result', on_delete=models.PROTECT, related_name='plagiarism_result')
