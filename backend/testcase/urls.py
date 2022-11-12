from django.urls import path
from testcase.views import TestcaseListOrCreate, TestcaseRetrieveOrDestroy


urlpatterns = [
    path('', TestcaseListOrCreate.as_view(), name='testcase_list_or_create'),
    path('<int:testcase_id>/', TestcaseRetrieveOrDestroy.as_view(), name='testcase_retrieve_or_destroy')
]
