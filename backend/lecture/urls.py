from django.urls import path
from lecture.views import LectureListOrCreate, LectureRetrieveOrDestroy


urlpatterns = [
    path('', LectureListOrCreate.as_view(), name='lecture_list_or_create'),
    path('<int:lecture_id>/', LectureRetrieveOrDestroy.as_view(), name='lecture_retrieve_or_destroy'),
]