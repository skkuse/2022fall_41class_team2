from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    return response


def custom_404_handler(request, exception):
    return JsonResponse(
        data={
            'code': status.HTTP_404_NOT_FOUND,
            'message': 'The resource was not found',
            'data': {
                'method': request.method,
                'path': request.path,
            },
        },
        status=status.HTTP_404_NOT_FOUND
    )


def custom_500_handler(request):
    return JsonResponse(
        data={
            'code': status.HTTP_500_INTERNAL_SERVER_ERROR,
            'message': 'Internal server error occurs',
            'data': {
                'method': request.method,
                'path': request.path,
            },
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )