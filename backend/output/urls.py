from django.urls import path
from output.views import retrieve_exercise_output


urlpatterns = [
    path('exercises/', retrieve_exercise_output, name='retrieve_exercise')
]
