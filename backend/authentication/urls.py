from django.urls import path
from authentication import views


urlpatterns = []

urlpatterns += [
    path('<int:user_id>/', views.user_detail, name='user_detail'),
    path('github/callback/', views.github_callback, name='github_callback'),
]
