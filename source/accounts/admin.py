from django.contrib import admin
from accounts.models import Account


@admin.register(Account)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'avatar')
