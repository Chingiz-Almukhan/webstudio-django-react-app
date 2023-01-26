from rest_framework import serializers

from accounts.models import Account
from news.models import News
from orders.models import Order, OrderWithoutAuthor


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    first_name = serializers.CharField(max_length=25, write_only=True, required=True)
    last_name = serializers.CharField(max_length=25, write_only=True, required=True)
    avatar = serializers.ImageField(required=True)
    birth_date = serializers.DateField(required=True)

    class Meta:
        model = Account
        fields = ('first_name', 'last_name', 'email', 'birth_date', 'avatar', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def validate(self, data):
        if Account.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError(
                {'email': 'Пользователь с такой почтой уже существует'})
        return data


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ('id', 'title', 'slug', 'author', 'content',)


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        read_only_fields = ('author', 'id')
        fields = ('name', 'technical_task', 'files', 'slug',)


class AnonymOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderWithoutAuthor
        fields = ('id', 'name', 'technical_task', 'files', 'first_name', 'last_name', 'email',)
