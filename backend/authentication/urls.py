from django.urls import path
from authentication import views
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = []

urlpatterns += [
    path('<int:user_id>/', views.user_detail, name='user_detail'),
    path('github/callback/', views.github_callback, name='github_callback'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
