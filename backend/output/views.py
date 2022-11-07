from rest_framework import status, fields
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, inline_serializer
from output.utils_execution import run


@extend_schema(
    description='Retrieve the output of exercise',
    methods=['POST'],
    request=inline_serializer(
        name='request_output_exercises',
        fields={
            'language': fields.CharField(),
            'content': fields.CharField(),
            'input': fields.CharField(),
        },
    ),
    responses={
        200: inline_serializer(
            name='response_output_exercises',
            fields={
                'exit_status': fields.IntegerField(),
                'output': fields.CharField(),
            },
        ),
    },
)
@api_view(['POST'])
def retrieve_exercise_output(request):
    data = request.data
    language = data.get('language')
    raw_code = data.get('code')
    raw_input = data.get('input')

    result = run(
        language=language,
        raw_code=raw_code,
        raw_input=raw_input,
    )
    return Response(
        data=result,
        status=status.HTTP_200_OK,
    )

