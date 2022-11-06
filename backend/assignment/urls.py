from django.urls import path
from assignment.views import AssignmentListOrCreate, AssignmentRetrieveOrDestroy


urlpatterns = [
    path('', AssignmentListOrCreate.as_view(), name='assignment_list_or_create'),
    path('<int:assignment_id>/', AssignmentRetrieveOrDestroy.as_view(), name='assignment_retrieve_or_destroy'),
]
