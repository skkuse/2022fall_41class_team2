from django.urls import path
from authentication import views


urlpatterns = []

urlpatterns += [
    path('github/callback/', views.github_callback, name='github_callback'),
]
