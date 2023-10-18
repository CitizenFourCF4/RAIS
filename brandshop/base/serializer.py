from rest_framework import serializers
from .models import Brand, Item, Cart
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
import re

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



class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def save(self):
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        email = self.validated_data['email']
        if password != password2:
            print('Пароли не совпадают')
            raise serializers.ValidationError({"Error": "Password Does not match"})
        
        
        if User.objects.filter(email = self.validated_data['email']).exists():
            raise serializers.ValidationError({"Error": "Email already exist"})
        
        
        EMAIL_REGEXP = '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
        if not re.fullmatch(EMAIL_REGEXP, email):
            raise serializers.ValidationError({"Error": "Email adress is incorrect"})
        
        account = User(email=self.validated_data['email'], username=self.validated_data['username'])
        account.set_password(password)
        account.save()
        
        return account   