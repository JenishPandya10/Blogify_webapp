# Generated by Django 5.1.5 on 2025-02-17 05:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blog',
            name='category',
        ),
    ]
