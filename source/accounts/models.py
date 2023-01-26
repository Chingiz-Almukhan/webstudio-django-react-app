from django.conf import settings
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models

import jwt

from datetime import datetime, timedelta

from django.utils import timezone

from accounts.managers import AccountManager


class Account(AbstractUser):
    email = models.EmailField(verbose_name='Электронная почта', unique=True, blank=True)
    avatar = models.ImageField(null=True, blank=True, upload_to='uploads/avatars', verbose_name='Аватар')
    username = None
    birth_date = models.DateField(verbose_name='Дата рождения', max_length=10, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = AccountManager()

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'

    def __str__(self):
        return f'{self.get_full_name()} - {self.email}'




