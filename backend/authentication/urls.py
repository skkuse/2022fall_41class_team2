from django.urls import path
from authentication import views


urlpatterns = []

urlpatterns += [
    path('<int:pk>/', views.user_detail, name='user-detail'),
    path('github/callback/', views.github_callback, name='github-callback'),
]
