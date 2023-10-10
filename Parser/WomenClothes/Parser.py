from bs4 import BeautifulSoup
import requests
import json
import re
from datetime import datetime

# url='https://brandshop.ru/zhenskoe/?mfp=17-pol%5B%D0%96%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B9%5D,83-kategoriya%5B%D0%91%D0%BE%D1%82%D0%B8%D0%BD%D0%BA%D0%B8%5D'
# soup = BeautifulSoup(requests.get(url).text, 'html.parser')

# items = soup.find_all('a', class_='product-card__link')

# clothes_dict = {'goods':[]}
# for elem in items:
#   clothes_dict['goods'].append(
#     {
#       'product_href': 'https://'+'brandshop.ru' + elem.get('href')
#     }
#   )
# with open('Parser/WomenClothes/product_links.json', 'w+') as file:
#   json.dump(clothes_dict, file)


# ----------------------------------------------------------------------------------------------------



with open('Parser/WomenClothes/product_links.json') as file:
    clothes_list = json.load(file)['goods'][:40]

with open('Parser/Brands/brands.json') as file:
   brands = json.load(file)['brands']

id = 39
clothes = {'goods': []}

for item in clothes_list:
   print(id)
   url = item['product_href']
   soup = BeautifulSoup(requests.get(url).text, 'html.parser')


   href = f'/goods/{id}'
   name = soup.find('span', class_='product-page__subheader font font_m font_grey').text.strip()
   price = int(''.join(re.findall(r'[0-9]',soup.find('div', class_="product-order__price-wrapper").find('span').text.strip())))
   color = soup.find('div', class_='tooltip__wrapper product-colors__tooltip').find('div', class_='tooltip').text
   sex = 'Женский'
   category = 'Ботинки'
   brand = soup.find('a', class_='product-page__header font font_title-l').text
   size = re.findall(r'[0-9SMLXY/-ONESIZE ]+',soup.find('div', class_='product-plate__item').text)[0].strip()
   
   img_href = soup.find('div', class_='zoom-region').find('div',class_='product-page__img _ibg').find('img').get('src')
   FOLDER = 'brandshop/media/images/'

   response = requests.get(img_href)
   imagename = FOLDER + str(id) + '.jpg'
   with open(imagename, 'wb') as picture:
    picture.write(response.content)


   for index, elem in enumerate(brands):
      if elem['brand_name'] == brand:
         brand_id = index+1
         break

   good_characteristic = {
    'id': id,
    'href': href,
    'name': name,
    'price': price,
    'color': color,
    'sex': sex,
    'category': category,
    'size': size,
    'picture_path': f'http://127.0.0.1:8000/media/images/{id}.jpg',
    'created': datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ"),
    'brand_id': brand_id
    }
   
   clothes['goods'].append(good_characteristic)
   id+=1
with open('Parser/WomenClothes/goods.json', 'w+') as file:
  json.dump(clothes, file)



   
   
   
