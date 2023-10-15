from rest_framework.views import APIView
from .models import Brand, Item
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import MyTokenObtainPairSerializer


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
  




class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer