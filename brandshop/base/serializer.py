from rest_framework import serializers
from .models import Brand, Item, Cart
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

UserModel = get_user_model()

class BrandSerializer(serializers.ModelSerializer):
  class Meta:
    model = Brand
    fields = ['id', 'href', 'name']


class ItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = Item
    fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
  class Meta:
    model = Cart
    fields = "__all__"


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)

    token['username'] = user.username

    return token    