# Generated by Django 4.0.4 on 2022-10-09 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('qldl', '0011_loaive_don_gia_tourimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='tourimage',
            name='name',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
