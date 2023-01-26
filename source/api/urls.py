from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from api.views import CustomUserCreate, NewsList, NewsDetail, CreateOrder, CreateAnonymOrder, OrderDetail, \
    AnonymOrderDetail, OrderList

urlpatterns = [
    path('', NewsList.as_view(), name='listpost'),
    path('news/<str:pk>/', NewsDetail.as_view(), name='detailnews'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', CustomUserCreate.as_view(), name='create_account'),
    path('create/order', CreateOrder.as_view(), name='create_order'),
    path('create/anonym/order', CreateAnonymOrder.as_view(), name='create_anonym_order'),
    path('orders/', OrderList.as_view(), name='orders'),
    path('order/<str:pk>', OrderDetail.as_view(), name='order_detail'),
    path('order/anonym/<str:pk>', AnonymOrderDetail.as_view(), name='anonym_order_detail')
]
