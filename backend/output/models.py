from django.db import models


class Result(models.Model):
    repo = models.ForeignKey('repo.Repo', on_delete=models.PROTECT, related_name='results')
    references = models.JSONField(default=list)
    code_description = models.TextField(default="")

    class Meta:
        ordering = ['id', 'repo_id']

    def __str__(self):
        return self.id


class FunctionalityResult(models.Model):
    result = models.OneToOneField('output.Result', on_delete=models.PROTECT, related_name='functionality_result')
    testcase_results = models.JSONField(default=list)


class ReadabilityResult(models.Model):
    result = models.OneToOneField('output.Result', on_delete=models.PROTECT, related_name='readability_result')
    pylint_score = models.FloatField()
    pycodestyle_score = models.IntegerField()
    mypy_score = models.IntegerField()


class EfficiencyResult(models.Model):
    result = models.OneToOneField('output.Result', on_delete=models.PROTECT, related_name='efficiency_result')
    loc_score = models.IntegerField()
    control_flow_complexity_score = models.IntegerField()
    reservation_words_score = models.FloatField()
    data_flow_complexity_score = models.FloatField()


class PlagiarismResult(models.Model):
    result = models.OneToOneField('output.Result', on_delete=models.PROTECT, related_name='plagiarism_result')
    num_files_compared = models.IntegerField()
    similarity_score = models.FloatField()
