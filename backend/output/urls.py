from django.urls import path
from output.views import execute_exercise_output, execute_testcase_output, execute_testcases_output, ResultListOrCreate, ResultRetrieve


urlpatterns = [
    path('exercises/', execute_exercise_output, name='execute_exercise'),
]

urlpatterns += [
    path('testcases/<int:testcase_id>/', execute_testcase_output, name='execute_testcase'),
    path('testcases/', execute_testcases_output, name='execute_testcases')
]

urlpatterns += [
    path('results/', ResultListOrCreate.as_view(), name='list_or_create_results'),
    path('results/<int:result_id>/', ResultRetrieve.as_view(), name='retrieve_result'),
]
