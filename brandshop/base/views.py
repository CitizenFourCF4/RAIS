from rest_framework.views import APIView
from .models import Brand, Item, Cart
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import MyTokenObtainPairSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


class BrandlistView(APIView):
  def get(self, request):
    output = [
      {
        'id': output.id,
        'href': output.href,
        'name': output.name,
        'title': output.title,
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
      'sizes': brand.sizes,
      'picture_path': brand.picture_path,
      'created': brand.created,
      'brand_href': brand.brand.href,
      'brand_name': brand.brand.title,

    } for brand in brand_list]
    if brand_responce:
      return Response(brand_responce, status=200)
    return Response(brand_responce, status=404)
  


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
      'sizes': item.sizes,
      'picture_path': item.picture_path,
      'created': item.created,
      'brand_href': item.brand.href,
      'brand_name': item.brand.title,
    }
    return Response(item_responce)
  
class ManPageView(APIView):
  def get(self, request):
    goods = Item.objects.filter(sex='Мужской')
    query = request.query_params.get('q')
    print(11, query)
    if query:
      goods = goods.filter(brand__name__icontains=query)
    goods_responce = [{
      'href': good.href,
      'name': good.name,
      'sizes':good.sizes,
      'price': good.price,
      'brand_name': good.brand.title,
      'picture_path':good.picture_path
    } for good in goods]

    return Response(goods_responce)
  

class WomanPageView(APIView):
  def get(self, request):
    goods = Item.objects.filter(sex='Женский')
    goods_responce = [{
      'href': good.href,
      'name': good.name,
      'sizes':good.sizes,
      'price': good.price,
      'brand_name': good.brand.name,
      'picture_path':good.picture_path
    } for good in goods]

    return Response(goods_responce)
  

@permission_classes([IsAuthenticated])
class CartView(APIView):
  def get(self, request):
    user = request.user
    cart_items = Cart.objects.filter(user=user)
    cart_items_response = [{
      'id': item.id,
      'item': item.item.name,
      'count': item.count,
      'price': item.item.price,
      'img_ref': item.item.picture_path,
    } for item in cart_items]
    return Response(cart_items_response)
  
  
@permission_classes([IsAuthenticated])  
class AddToCartView(APIView):
  def post(self, request):
    user = request.user
    print(user)
    Cart.objects.create(
      count = request.data.get('count'),
      item_id = request.data.get('item_id'),
      user = request.user,
      size = request.data.get('size')
    )
    return Response({})
  

# class ItemsViewSet(APIView):
#   def get(self, request):
#     query = request.query_params.get('q')
#     qs = Item.objects.filter(brand__icontains=query) if query else Item.object.all()
#     return qs


class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer