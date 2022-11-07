from django.urls import path
from enrollment.views import EnrollmentListOrCreate, EnrollmentRetrieveOrDestroy


urlpatterns = [
    path('', EnrollmentListOrCreate.as_view(), name='enrollment_list_or_create'),
    path('<int:enrollment_id>/', EnrollmentRetrieveOrDestroy.as_view(), name='enrollment_retrieve_or_destroy'),
]
