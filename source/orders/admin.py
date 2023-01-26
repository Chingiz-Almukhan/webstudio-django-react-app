from django.contrib import admin

from orders.models import Order, OrderWithoutAuthor


@admin.register(Order)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'technical_task', 'slug',)


@admin.register(OrderWithoutAuthor)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'first_name', 'last_name', 'technical_task')
