from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import User, AbstractUser


class Brand(models.Model):
  title = models.CharField(max_length=50, null=False)
  href = models.CharField(max_length=100, null=False)
  name = models.CharField(max_length=50, null=False)

  def __str__(self) -> str:
    return self.name
  

class Item(models.Model):
  href = models.CharField(max_length=100, null=False)
  brand = models.ForeignKey(Brand, on_delete=models.SET_DEFAULT, default='Unknown')
  name = models.CharField(max_length=100, default='')
  price = models.PositiveIntegerField()
  color = models.CharField(max_length=40, null=False)
  sex = models.CharField(max_length=20, null=False)
  category = models.CharField(max_length=40, null=False)
  sizes = ArrayField(models.CharField(max_length=15))
  picture_path = models.CharField(default='http://127.0.0.1:8000/media/images/default.jpg', max_length=150)
  created = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name
  


class Cart(models.Model):
  item = models.ForeignKey(Item, on_delete=models.CASCADE)
  count = models.PositiveIntegerField()
  size = models.CharField(max_length=15, default='One size')
  user = models.ForeignKey(User, on_delete=models.CASCADE)
 	