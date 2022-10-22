from .base import *

import os
import environ

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['*']

# Environment variables definition
env = environ.Env(
    DEBUG=(bool, False)
)
environ.Env.read_env(os.path.join(BASE_DIR, '.prod.env'))

SECRET_KEY = os.environ.get('SECRET_KEY')

WSGI_APPLICATION = 'backend.wsgi.prod.application'
