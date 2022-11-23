from django.contrib import admin
from django.urls import path, include
from rest_framework.permissions import AllowAny
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from backend.handler import custom_404_handler, custom_500_handler


class CustomAPIView(SpectacularAPIView):
    permission_classes = [AllowAny]


class CustomRedocView(SpectacularRedocView):
    permission_classes = [AllowAny]


class CustomSwaggerView(SpectacularSwaggerView):
    permission_classes = [AllowAny]


handler404 = custom_404_handler
handler500 = custom_500_handler

urlpatterns = []

urlpatterns += [
    path('admin/', admin.site.urls, name='admin'),
]

urlpatterns += [
    path('schema/', CustomAPIView.as_view(), name='schema'),
    path('docs/redoc/', CustomRedocView.as_view(), name='redoc'),
    path('docs/swagger/', CustomSwaggerView.as_view(), name='swagger'),
]

urlpatterns += [
    path('auth/', include('authentication.urls'), name='auth'),
]

urlpatterns += [
    path('lectures/', include('lecture.urls'), name='lectures'),
]

urlpatterns += [
    path('enrollments/', include('enrollment.urls'), name='enrollments'),
]

urlpatterns += [
    path('assignments/', include('assignment.urls'), name='assignment'),
]

urlpatterns += [
    path('testcases/', include('testcase.urls'), name='testcases'),
]

urlpatterns += [
    path('repos/', include('repo.urls'), name='repos')
]

urlpatterns += [
    path('outputs/', include('output.urls'), name='outputs')
]
