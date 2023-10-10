from django.urls import path
from .views import BrandlistView, OneBrandView, ItemView, ManPageView, WomanPageView, LoginView, register_user, UserLogout, ExampleView

urlpatterns = [
  path('brandlist', BrandlistView.as_view(), name='home'),
  path('login/', LoginView.as_view(), name='login'),
  path('logout/', UserLogout.as_view(), name='logout'),
  path('register/', register_user, name='register'),
  path('brand/<str:brand>/', OneBrandView.as_view(), name='room'),
  path('item/<str:pk>/', ItemView.as_view(), name='item'),
  path('muzhskoe', ManPageView.as_view(), name='muzhskoe'),
  path('zhenskoe', WomanPageView.as_view(), name='zhenskoe'),
  path('user', ExampleView.as_view(), name='user'),
]