from bs4 import BeautifulSoup
import requests
import json


url='https://brandshop.ru/brandlist'
soup = BeautifulSoup(requests.get(url).text, 'html.parser')

items = soup.find_all('a', class_='link link_black')
brands = {'brands': []}
for item in items:
  brands['brands'].append({
     'href': 'https://brandshop.ru'+item.get('href'),
     'brand_name': item.find('span').text
  })

with open('Parser/Brands/brands.json', 'w+') as file:
    json.dump(brands, file)