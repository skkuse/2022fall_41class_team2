from django.urls import path
from output.views import retrieve_exercise_output, retrieve_testcase_output, ResultListOrCreate, ResultRetrieve


urlpatterns = [
    path('exercises/', retrieve_exercise_output, name='retrieve_exercise'),
]

urlpatterns += [
    path('testcases/<int:testcase_id>/', retrieve_testcase_output, name='retrieve_testcase'),
]

urlpatterns += [
    path('results/', ResultListOrCreate.as_view(), name='list_or_create_results'),
    path('results/<int:result_id>/', ResultRetrieve.as_view(), name='retrieve_result'),
]
