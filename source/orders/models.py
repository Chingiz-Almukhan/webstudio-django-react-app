from django.db import models
from django.utils import timezone


class Order(models.Model):
    name = models.CharField(max_length=250, verbose_name='Номер заказа')
    technical_task = models.TextField(verbose_name='Техническое задание')
    files = models.FileField(null=True, blank=True, upload_to='uploads/files', verbose_name='Вложение')
    slug = models.SlugField(max_length=250, unique_for_date='published')
    published = models.DateTimeField(default=timezone.now, verbose_name='Дата публикации')
    author = models.ForeignKey('accounts.Account', on_delete=models.CASCADE, verbose_name='Автор')

    class Meta:
        ordering = ('-published',)
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

    def __str__(self):
        return self.name


class OrderWithoutAuthor(models.Model):
    name = models.CharField(max_length=250, verbose_name='Номер заказа')
    first_name = models.CharField(max_length=25, verbose_name='Имя')
    last_name = models.CharField(max_length=25, verbose_name='Фамилия')
    email = models.CharField(max_length=25, verbose_name='Почта')
    files = models.FileField(null=True, blank=True, upload_to='uploads/files', verbose_name='Вложение')
    technical_task = models.TextField(verbose_name='Техническое задание')
    published = models.DateTimeField(default=timezone.now, verbose_name='Дата публикации')

    class Meta:
        ordering = ('-published',)
        verbose_name = 'Заказ без автора'
        verbose_name_plural = 'Заказы без автора'

    def __str__(self):
        return self.name
