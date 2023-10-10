from bs4 import BeautifulSoup
import requests
import json

url='https://brandshop.ru/'
soup = BeautifulSoup(requests.get(url).text, 'html.parser')
# items = soup.find_all('a', class_='popular-brands__item')
# t = {'goods':[]}
# for elem in items:
#     t['goods'].append({'good_href': elem.get('href'), 'img_href': elem.find('div').find('picture').find('img').get('src')})
# with open('Parser/HeadPage/popular_brands_links.json', 'w+') as file:
#     json.dump(t, file)
# FOLDER = 'Parser/HeadPage/PopularBrands/svg/'
# with open('Parser/HeadPage/PopularBrands/popular_brands_links.json') as file:
#     file = json.load(file)

# for elem in file['goods']:
#     response = requests.get(elem['img_href'])
#     imagename = FOLDER + elem['good_href'][1:-1] + '.svg'
#     with open(imagename, 'wb') as picture:
#         picture.write(response.content)



items = soup.find_all('a', class_='product-card__link')
t = {'goods':[]}
for elem in items:
    t['goods'].append({'good_href': 'brandshop.ru' + elem.get('href'), 'img_href': elem.find('div').find('div').find('picture').find('img').get('src')})
with open('Parser/HeadPage/NewItems/new_items_links.json', 'w+') as file:
    json.dump(t, file)
FOLDER = 'Parser/HeadPage/NewItems/svg/'
with open('Parser/HeadPage/NewItems/new_items_links.json') as file:
    file = json.load(file)

for i, elem in enumerate(file['goods']):
    response = requests.get(elem['img_href'])
    imagename = FOLDER + str(i) + '.jpg'
    with open(imagename, 'wb') as picture:
        picture.write(response.content)