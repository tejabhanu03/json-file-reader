# Generated by Django 4.0.2 on 2022-02-21 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loginAndRegistor', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FileData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.RemoveField(
            model_name='user',
            name='data',
        ),
    ]
