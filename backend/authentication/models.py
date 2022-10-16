from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):

    def update_or_create_user(self, email=None, nickname=None, **extra):
        if not email:
            raise ValueError('must have user email field')
        if not nickname:
            raise ValueError('must have user nickname field')

        if self.filter(email=email).exists():
            self.update(
                last_login=timezone.now(),
                **extra,
            )
        else:
            self.create(
                email=email,
                nickname=nickname,
                last_login=timezone.now(),
                **extra,
            )

        user = self.get(email=email)
        return user


class User(AbstractBaseUser):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    last_login = models.DateTimeField(default=timezone.now)
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
