# Generated by Django 4.1.2 on 2022-10-21 03:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('lecture', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Enrollment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lecture', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='enrollments', to='lecture.lecture')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='enrollments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]