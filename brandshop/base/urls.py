from django.urls import path
from .views import BrandlistView
from .views import OneBrandView, ItemView, ManPageView, WomanPageView, CartView
from rest_framework_simplejwt.views import TokenRefreshView

from .views import MyTokenObtainPairView



urlpatterns = [
  path('brandlist', BrandlistView.as_view(), name='home'),
  path('brand/<str:brand>/', OneBrandView.as_view(), name='room'),
  path('item/<str:pk>/', ItemView.as_view(), name='item'),
  path('muzhskoe', ManPageView.as_view(), name='muzhskoe'),
  path('zhenskoe', WomanPageView.as_view(), name='zhenskoe'),
  path('cart_items', CartView.as_view(), name='cart_items'),
  
  path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]