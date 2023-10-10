from rest_framework.views import APIView
from .models import Brand, Item
from rest_framework.response import Response
from rest_framework import views, permissions
from .serializer import LoginSerializer, UserRegisterSerializer
from django.contrib.auth import login, logout
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.models import User

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.views import APIView


class BrandlistView(APIView):
  def get(self, request):
    output = [
      {
        'id': output.id,
        'href': output.href,
        'name': output.name,
      }
    for output in Brand.objects.all()] 
    return Response(output)
  


class OneBrandView(APIView):
  def get(self, request, brand):
    brand_list = Item.objects.filter(brand__name=brand)
    brand_responce = [{
      'id': brand.id,
      'href': brand.href,
      'name': brand.name,
      'price': brand.price,
      'color': brand.color,
      'sex': brand.sex,
      'category': brand.category,
      'size': brand.size,
      'picture_path': brand.picture_path,
      'created': brand.created,
      'brand_href': brand.brand.href,
      'brand_name': brand.brand.name,

    } for brand in brand_list]
    return Response(brand_responce)
  


class ItemView(APIView):
  def get(self,request, pk):
    item = Item.objects.get(id=pk)
    item_responce = {
      'id': item.id,
      'href': item.href,
      'name': item.name,
      'price': item.price,
      'color': item.color,
      'sex': item.sex,
      'category': item.category,
      'size': item.size,
      'picture_path': item.picture_path,
      'created': item.created,
      'brand_href': item.brand.href,
      'brand_name': item.brand.name,
    }
    return Response(item_responce)
  
class ManPageView(APIView):
  def get(self, request):
    goods = Item.objects.filter(sex='Мужской')
    goods_responce = [{
      'href': good.href,
      'name': good.name,
      'size':good.size,
      'price': good.price,
      'brand_name': good.brand.name,
      'picture_path':good.picture_path
    } for good in goods]

    return Response(goods_responce)
  

class WomanPageView(APIView):
  def get(self, request):
    goods = Item.objects.filter(sex='Женский')
    goods_responce = [{
      'href': good.href,
      'name': good.name,
      'size':good.size,
      'price': good.price,
      'brand_name': good.brand.name,
      'picture_path':good.picture_path
    } for good in goods]

    return Response(goods_responce)
  

class LoginView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = LoginSerializer(data=self.request.data, context={ 'request': self.request })
        print(request.user)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response({'username': str(serializer.validated_data['user'])}, status=status.HTTP_202_ACCEPTED)


@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserRegisterSerializer(data=request.data)
        print(request.data['email'])
        if serializer.is_valid():
            if User.objects.filter(email=request.data['email']).exists():
               error = { "username": "A user with that email already exists." }
               return Response(error, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserLogout(APIView):
  def post(self, request):
    logout(request)
    return Response(status=status.HTTP_200_OK)
  



class ExampleView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)
# class UserView(APIView):
#   permission_classes = (permissions.AllowAny,)
#   authentication_classes = (SessionAuthentication,)

#   def get(self, request):
#     serializer = UserSerializer(request.user)
#     if not serializer.data['username']:
#       return Response({'detail': 'Authentication credentials were not provided'}, status=status.HTTP_403_FORBIDDEN)
#     return Response({'user': serializer.data}, status=status.HTTP_200_OK)