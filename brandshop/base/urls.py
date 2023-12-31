from django.urls import path
from .views import BrandlistView
from .views import OneBrandView, ItemView, ManPageView, WomanPageView, AccessoriesPageView, CartView, AddToCartView, user_register_view
from rest_framework_simplejwt.views import TokenRefreshView

from .views import MyTokenObtainPairView



urlpatterns = [
  path('add_to_cart/', AddToCartView.as_view(), name='add_to_cart'),
  path('brandlist', BrandlistView.as_view(), name='home'),
  path('brand/<str:brand>/', OneBrandView.as_view(), name='room'),
  path('item/<str:pk>/', ItemView.as_view(), name='item'),
  path('muzhskoe', ManPageView.as_view(), name='muzhskoe'),
  path('zhenskoe', WomanPageView.as_view(), name='zhenskoe'),
  path('accessories', AccessoriesPageView.as_view(), name='accessories'),
  path('cart_items', CartView.as_view(), name='cart_items'),

  
  path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path("register/", user_register_view, name="register"),
]