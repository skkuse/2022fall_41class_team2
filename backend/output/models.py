from django.db import models


class Result(models.Model):
    repo = models.ForeignKey('repo.Repo', on_delete=models.PROTECT, related_name='results')
    references = models.JSONField(default=[])
    # TODO @동우
    code_description = models.TextField(default="")


# TODO @승호
class FunctionalityResult(models.Model):
    result = models.ForeignKey('output.Result', on_delete=models.PROTECT, related_name='functionality_results')


# TODO @동우
class ReadabilityResult(models.Model):
    result = models.ForeignKey('output.Result', on_delete=models.PROTECT, related_name='readability_results')


# TODO @영준
class EfficiencyResult(models.Model):
    result = models.ForeignKey('output.Result', on_delete=models.PROTECT, related_name='efficiency_results')


# TODO @영준
class PlagiarismResult(models.Model):
    result = models.ForeignKey('output.Result', on_delete=models.PROTECT, related_name='plagiarism_results')
