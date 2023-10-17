from rest_framework.views import APIView
from .models import Brand, Item, Cart
from django.db.models import Q
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

    query = request.query_params.get('q')
    sex = request.query_params.get('sex').split(',')
    category = request.query_params.get('category').split(',')
    price = request.query_params.get('price').split(',')
    brand = request.query_params.get('brand').split(',')

    if query not in ['', 'undefined']:
      brand_list = brand_list.filter(
        Q(brand__title__icontains=query) |
        Q(name__icontains=query)
        )
      
    if sex not in [['undefined'], ['']]:
      brand_list = brand_list.filter(sex__in=sex)

    if category not in [['undefined'], ['']]:
      brand_list = brand_list.filter(category__in=category)

    if price not in [['undefined'], ['']]:
      price = [int(item) for item in price]
      brand_list = brand_list.filter(price__in=price)

    if brand not in [['undefined'], ['']]:
      brand_list = brand_list.filter(brand__title__in=brand)

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
    sex = request.query_params.get('sex').split(',')
    category = request.query_params.get('category').split(',')
    price = request.query_params.get('price').split(',')
    brand = request.query_params.get('brand').split(',')

    if query not in ['', 'undefined']:
      goods = goods.filter(
        Q(brand__title__icontains=query) |
        Q(name__icontains=query)
        )
      
    if sex not in [['undefined'], ['']]:
      goods = goods.filter(sex__in=sex)

    if category not in [['undefined'], ['']]:
      goods = goods.filter(category__in=category)

    if price not in [['undefined'], ['']]:
      price = [int(item) for item in price]
      goods = goods.filter(price__in=price)

    if brand not in [['undefined'], ['']]:
      goods = goods.filter(brand__title__in=brand)    
    
    goods_responce = [{
      'href': good.href,
      'name': good.name,
      'sizes':good.sizes,
      'price': good.price,  
      'brand_name': good.brand.title,
      'picture_path':good.picture_path,
      'sex': good.sex,  
      'category': good.category,
    } for good in goods]

    return Response(goods_responce)
  

class WomanPageView(APIView):
  def get(self, request):
    goods = Item.objects.filter(sex='Женский')

    query = request.query_params.get('q')
    sex = request.query_params.get('sex').split(',')
    category = request.query_params.get('category').split(',')
    price = request.query_params.get('price').split(',')
    brand = request.query_params.get('brand').split(',')

    if query not in ['', 'undefined']:
      goods = goods.filter(
        Q(brand__title__icontains=query) |
        Q(name__icontains=query)
        )
      
    if sex not in [['undefined'], ['']]:
      goods = goods.filter(sex__in=sex)

    if category not in [['undefined'], ['']]:
      goods = goods.filter(category__in=category)

    if price not in [['undefined'], ['']]:
      price = [int(item) for item in price]
      goods = goods.filter(price__in=price)

    if brand not in [['undefined'], ['']]:
      goods = goods.filter(brand__title__in=brand) 


    goods_responce = [{
      'href': good.href,
      'name': good.name,
      'sizes':good.sizes,
      'price': good.price,
      'brand_name': good.brand.title,
      'picture_path':good.picture_path,
      'sex': good.sex,  
      'category': good.category,
    } for good in goods]

    return Response(goods_responce)
  

class AccessoriesPageView(APIView):
  def get(self, request):
    goods = Item.objects.filter(sex='Аксессуары')

    query = request.query_params.get('q')
    sex = request.query_params.get('sex').split(',')
    category = request.query_params.get('category').split(',')
    price = request.query_params.get('price').split(',')
    brand = request.query_params.get('brand').split(',')

    if query not in ['', 'undefined']:
      goods = goods.filter(
        Q(brand__title__icontains=query) |
        Q(name__icontains=query)
        )
      
    if sex not in [['undefined'], ['']]:
      goods = goods.filter(sex__in=sex)

    if category not in [['undefined'], ['']]:
      goods = goods.filter(category__in=category)

    if price not in [['undefined'], ['']]:
      price = [int(item) for item in price]
      goods = goods.filter(price__in=price)

    if brand not in [['undefined'], ['']]:
      goods = goods.filter(brand__title__in=brand) 


    goods_responce = [{
      'href': good.href,
      'name': good.name,
      'sizes':good.sizes,
      'price': good.price,
      'brand_name': good.brand.title,
      'picture_path':good.picture_path,
      'sex': good.sex,  
      'category': good.category,
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
      'size': item.size,
      'item_ref': item.item.href,
    } for item in cart_items]
    return Response(cart_items_response)
  
  def post(self, request):
    if request.data.get('action') == 'remove':
      user = request.user
      cart_item = Cart.objects.filter(user = user, item__name=(request.data.get('item')), size=(request.data.get('size')))
      cart_item.delete()

    elif request.data.get('action') == 'reduce':
      user = request.user
      cart_item = Cart.objects.get(user = user, item__name=(request.data.get('item')), size=(request.data.get('size')))
      cart_item.count-= 1
      cart_item.save()
      

    elif request.data.get('action') == 'increase':
      user = request.user
      cart_item = Cart.objects.get(user = user, item__name=(request.data.get('item')), size=(request.data.get('size')))
      cart_item.count +=1
      cart_item.save()
   
    return Response({})
    
  
  
@permission_classes([IsAuthenticated])  
class AddToCartView(APIView):
  def post(self, request):
    user = request.user
    cart_items = Cart.objects.filter(user=user, item=request.data.get('item_id'), size=request.data.get('size'))
    if cart_items:
      item = Cart.objects.get(item=request.data.get('item_id'), size=request.data.get('size'))
      item.count += 1
      item.save()
    else:
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
#     qs = Item.objects.filter(
#         Q(brand__title__icontains=query)
#       ) if query else Item.object.all()
#     return qs


class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer