from rest_framework import status
from rest_framework.exceptions import APIException


class BadRequestError(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'bad request'
    default_code = 'bad_request'


class InternalServerError(APIException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = 'internal server error.'
    default_code = 'internal_server_error'


class ServerNotImplemented(APIException):
    status_code = status.HTTP_501_NOT_IMPLEMENTED
    default_detail = 'not implemented.'
    default_code = 'not_implemented'


class ServiceUnavailable(APIException):
    status_code = status.HTTP_503_SERVICE_UNAVAILABLE
    default_detail = 'service unavailable.'
    default_code = 'service_unavailable'
