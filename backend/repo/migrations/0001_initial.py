# Generated by Django 4.1.2 on 2022-10-21 03:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('assignment', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Repo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('assignment', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='repos', to='assignment.assignment')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='repos', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]