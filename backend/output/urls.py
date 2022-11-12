from django.urls import path
from output.views import retrieve_exercise_output, ResultListOrCreate


urlpatterns = [
    path('exercises/', retrieve_exercise_output, name='retrieve_exercise'),
    path('results/', ResultListOrCreate.as_view(), name='list_or_create_results'),
]
