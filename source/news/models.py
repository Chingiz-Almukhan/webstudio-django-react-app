from django.db import models
from django.utils import timezone


class News(models.Model):
    title = models.CharField(max_length=250, verbose_name='Заголовок')
    content = models.TextField(verbose_name='Содержание')
    slug = models.SlugField(max_length=250, unique_for_date='published')
    picture = models.ImageField(null=True, blank=True, upload_to='uploads/news', verbose_name='Фото')
    published = models.DateTimeField(default=timezone.now, verbose_name='Дата публикации')
    author = models.ForeignKey('accounts.Account', on_delete=models.CASCADE, verbose_name='Автор')

    class Meta:
        ordering = ('-published',)
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'

    def __str__(self):
        return self.title
