from django.urls import path
from assignment.views import AssignmentListOrCreate, AssignmentRetrieveOrDestroy
from rest_framework.urlpatterns import format_suffix_patterns
from assignment import views
urlpatterns = [
    path('assignment/', AssignmentListOrCreate.as_view(), name='assignment_list_or_create'),
    path('assignment/<int:assignment_id>/', AssignmentRetrieveOrDestroy.as_view(), name='assignment_retrieve_or_destroy'),
]

urlpatterns = format_suffix_patterns(urlpatterns)