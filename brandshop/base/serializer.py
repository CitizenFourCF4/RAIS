from rest_framework import serializers
from .models import Brand, Item
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()

class BrandSerializer(serializers.ModelSerializer):
  class Meta:
    model = Brand
    fields = ['id', 'href', 'name']


class ItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = Item
    fields = "__all__"


class LoginSerializer(serializers.Serializer):
    """
    This serializer defines two fields for authentication:
      * username
      * password.
    It will try to authenticate the user with when validated.
    """
    username = serializers.CharField(
        label="Username",
        write_only=True
    )
    password = serializers.CharField(
        label="Password",
        # This will be used when the DRF browsable API is enabled
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    def validate(self, attrs):
        # Take username and password from request
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            # Try to authenticate the user using Django auth framework.
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            if not user:
                # If we don't have a regular user, raise a ValidationError
                msg = 'Access denied: wrong username or password.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Both "username" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        # We have a valid user, put it in the serializer's validated_data.
        # It will be used in the view.
        attrs['user'] = user
        return attrs
    


class UserRegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserModel
    fields = ['username', 'password', 'email']

  def create(self, clean_data):
    user_obj = UserModel.objects.create_user(username=clean_data['username'], password=clean_data['password'], email=clean_data['email'])
    user_obj.save()
    return user_obj



# class UserSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = UserModel
#     fields = ('email', 'username')