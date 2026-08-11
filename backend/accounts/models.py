# from django.db import models
#
# # Create your models here.
# from django.contrib.auth.models import User
# from django.db import models
#
#
# class UserProfile(models.Model):
#
#     class Role(models.TextChoices):
#         USER = "USER", "User"
#         ADMIN = "ADMIN", "Admin"
#
#     user = models.OneToOneField(
#         User,
#         on_delete=models.CASCADE,
#         related_name="profile"
#     )
#
#     full_name = models.CharField(
#         max_length=150
#     )
#
#     role = models.CharField(
#         max_length=10,
#         choices=Role.choices,
#         default=Role.USER
#     )
#
#     is_active = models.BooleanField(
#         default=True
#     )
#
#     created_at = models.DateTimeField(
#         auto_now_add=True
#     )
#
#     updated_at = models.DateTimeField(
#         auto_now=True
#     )
#
#     def __str__(self):
#         return f"{self.user.username} - {self.role}"


######
from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):

    class Role(models.TextChoices):
        USER = "USER", "User"
        ADMIN = "ADMIN", "Admin"

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )

    full_name = models.CharField(
        max_length=150,
        blank=True
    )

    role = models.CharField(
        max_length=10,
        choices=Role.choices,
        default=Role.USER
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.role}"