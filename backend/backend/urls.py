from django.contrib import admin
from django.urls import path, include
from rest_framework.permissions import AllowAny
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


class CustomAPIView(SpectacularAPIView):
    permission_classes = [AllowAny]


class CustomRedocView(SpectacularRedocView):
    permission_classes = [AllowAny]


class CustomSwaggerView(SpectacularSwaggerView):
    permission_classes = [AllowAny]


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
