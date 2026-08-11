from django.db import models

# Create your models here.
from django.db import models


class Team(models.Model):

    name = models.CharField(
        max_length=100,
        unique=True
    )

    short_name = models.CharField(
        max_length=10,
        unique=True
    )

    logo = models.ImageField(
        upload_to="teams/logos/",
        blank=True,
        null=True
    )

    captain = models.CharField(
        max_length=150,
        blank=True
    )

    coach = models.CharField(
        max_length=150,
        blank=True
    )

    home_ground = models.CharField(
        max_length=200,
        blank=True
    )

    city = models.CharField(
        max_length=100,
        blank=True
    )

    founded_year = models.PositiveIntegerField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["name"]
        indexes = [
            models.Index(fields=["name"]),
            models.Index(fields=["short_name"]),
        ]

    def __str__(self):
        return f"{self.name} ({self.short_name})"