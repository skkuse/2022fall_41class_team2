import os


SETTINGS_MODULE = os.environ.get('DJANGO_SETTINGS_MODULE')

if not SETTINGS_MODULE or SETTINGS_MODULE == 'backend.settings.dev' or SETTINGS_MODULE == 'backend.settings':
    from .dev import *
elif SETTINGS_MODULE == 'backend.settings.prod':
    from .prod import *
