from .base import *

import os
import environ

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Environment variables definition
env = environ.Env(
    DEBUG=(bool, True)
)
environ.Env.read_env(os.path.join(BASE_DIR, '.dev.env'))

SECRET_KEY = os.environ.get('SECRET_KEY')

WSGI_APPLICATION = 'backend.wsgi.dev.application'
