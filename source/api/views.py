from datetime import date

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import status, serializers, permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from api.serializers import CustomUserSerializer, NewsSerializer, OrderSerializer, AnonymOrderSerializer
from news.models import News
from orders.models import Order, OrderWithoutAuthor


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        current_year = date.today().year
        year_of_birth = int(request.data['birth_date'].split('-')[0])
        age = current_year - year_of_birth
        if age < 18:
            raise serializers.ValidationError(
                {'birth_date': 'Лицам младше 18 лет запрещено использовать портал'}
            )
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NewsList(ListAPIView):
    serializer_class = NewsSerializer
    queryset = News.objects.all()


class NewsDetail(RetrieveAPIView):
    serializer_class = NewsSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(News, slug=item)


class CreateOrder(APIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Order.objects.all()

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save(author=request.user)
            if order:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateAnonymOrder(CreateAPIView):
    queryset = OrderWithoutAuthor.objects.all()
    serializer_class = AnonymOrderSerializer


class IsOwner(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.author == request.user


class OrderDetail(RetrieveAPIView):
    serializer_class = NewsSerializer
    permission_classes = [IsOwner, ]

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(News, slug=item)


class AnonymOrderDetail(RetrieveAPIView):
    serializer_class = AnonymOrderSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(News, name=item)


class OrderList(ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsOwner, ]
    queryset = Order.objects.all()
