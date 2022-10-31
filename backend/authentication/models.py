from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):

    def update_or_create_user(self, nickname: str = None, oauth_id: str = None, **extra):
        if not nickname:
            raise ValueError('must have user nickname field')
        if not oauth_id:
            raise ValueError('must have user oauth id field')

        for key in extra:
            if not extra[key]:
                extra[key] = str()

        if self.filter(oauth_id=oauth_id).exists():
            self.update(
                nickname=nickname,
                last_login=timezone.now(),
                **extra,
            )
        else:
            self.create(
                nickname=nickname,
                oauth_id=oauth_id,
                last_login=timezone.now(),
                **extra,
            )

        user = self.get(oauth_id=oauth_id)
        return user


class User(AbstractBaseUser):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    last_login = models.DateTimeField(default=timezone.now)
    nickname = models.CharField(max_length=255, unique=True, db_index=True)
    oauth_id = models.CharField(max_length=255, unique=True, db_index=True)
    name = models.CharField(max_length=255, default="")
    email = models.CharField(max_length=255, default="")
    profile_image_url = models.URLField(default="")
    github_api_url = models.URLField(default="")
    github_profile_url = models.URLField(default="")

    objects = UserManager()

    USERNAME_FIELD = 'nickname'
    REQUIRED_FIELDS = ['oauth_id']

    class Meta:
        ordering = ['nickname', 'created_at']

    def __str__(self):
        return self.nickname
