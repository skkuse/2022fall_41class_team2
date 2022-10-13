from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email=None, nickname=None, **extra_fields):
        if not email:
            raise ValueError('must have user email field')
        if not nickname:
            raise ValueError('must have user nickname field')
        user = self.model(
            email=email,
            nickname=nickname,
            **extra_fields,
        )
        user.save()
        return user


class User(AbstractBaseUser):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    last_login = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True, db_index=True)
    nickname = models.CharField(max_length=255, unique=True, db_index=True)
    profile_image_url = models.URLField()
    github_api_url = models.URLField()

    objects = UserManager()

    USERNAME_FIELD = 'nickname'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email']

    class Meta:
        ordering = ['nickname', 'created_at']

    def __str__(self):
        return self.nickname

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name
