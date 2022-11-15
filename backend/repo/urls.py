from django.urls import path
from repo.views import RepoListOrCreate, RepoRetrieveOrUpdateOrDestroy


urlpatterns = [
    path('', RepoListOrCreate.as_view(), name='repo_list_or_create'),
    path('<int:repo_id>/', RepoRetrieveOrUpdateOrDestroy.as_view(), name='repo_retrieve_or_update_or_destroy'),
]
