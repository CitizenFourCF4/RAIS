# Generated by Django 4.2.5 on 2023-10-15 08:49

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('href', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=80)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('href', models.CharField(max_length=100)),
                ('name', models.CharField(default='', max_length=100)),
                ('price', models.PositiveIntegerField()),
                ('color', models.CharField(max_length=40)),
                ('sex', models.CharField(max_length=20)),
                ('category', models.CharField(max_length=40)),
                ('sizes', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=15), size=None)),
                ('picture_path', models.CharField(default='http://127.0.0.1:8000/media/images/default.jpg', max_length=150)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('brand', models.ForeignKey(default='Unknown', on_delete=django.db.models.deletion.SET_DEFAULT, to='base.brand')),
            ],
        ),
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.PositiveIntegerField()),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.item')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
