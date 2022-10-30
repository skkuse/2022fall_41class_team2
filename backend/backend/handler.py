from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    return response


def custom_404_handler(request, exception):
    return JsonResponse({
        'code': status.HTTP_404_NOT_FOUND,
        'message': 'The resource was not found',
        'data': {
            'method': request.method,
            'path': request.path,
        },
    }, status=status.HTTP_404_NOT_FOUND)
