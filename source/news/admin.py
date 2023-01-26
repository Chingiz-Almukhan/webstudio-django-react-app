from django.contrib import admin

from news.models import News


@admin.register(News)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'slug', 'author')
    prepopulated_fields = {'slug': ('title',), }
