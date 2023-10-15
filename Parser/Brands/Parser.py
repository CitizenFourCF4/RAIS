from bs4 import BeautifulSoup
import requests
import json


url='https://brandshop.ru/brandlist'
soup = BeautifulSoup(requests.get(url).text, 'html.parser')

items = soup.find_all('a', class_='link link_black')
brands = {'brands': []}
id = 1
for item in items:
  href = item.get('href')
  name = item.find('span').text
  brands['brands'].append({
     'id': id,
     'title': name,
     'href': '/brands'+ href[:-1], 
     'name': href[1:-1],
  })
  id+=1

with open('Parser/Brands/brands.json', 'w+') as file:
    json.dump(brands, file)