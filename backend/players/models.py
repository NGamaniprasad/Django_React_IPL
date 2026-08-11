from django.db import models

# Create your models here.
from django.core.validators import (
    MaxValueValidator,
    MinValueValidator,
)
from django.db import models

from teams.models import Team


class Player(models.Model):

    class Role(models.TextChoices):
        BATTER = "BATTER", "Batter"
        BOWLER = "BOWLER", "Bowler"
        ALL_ROUNDER = "ALL_ROUNDER", "All Rounder"
        WICKET_KEEPER = "WICKET_KEEPER", "Wicket Keeper"

    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name="players"
    )

    name = models.CharField(
        max_length=150
    )

    role = models.CharField(
        max_length=20,
        choices=Role.choices
    )

    nationality = models.CharField(
        max_length=100
    )

    date_of_birth = models.DateField(
        blank=True,
        null=True
    )

    batting_style = models.CharField(
        max_length=100,
        blank=True
    )

    bowling_style = models.CharField(
        max_length=100,
        blank=True
    )

    jersey_number = models.PositiveIntegerField(
        blank=True,
        null=True,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(99),
        ]
    )

    image = models.ImageField(
        upload_to="players/images/",
        blank=True,
        null=True
    )

    matches = models.PositiveIntegerField(
        default=0
    )

    runs = models.PositiveIntegerField(
        default=0
    )

    wickets = models.PositiveIntegerField(
        default=0
    )

    strike_rate = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        default=0
    )

    batting_average = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        default=0
    )

    economy = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0
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
            models.Index(fields=["team"]),
            models.Index(fields=["role"]),
        ]

        constraints = [
            models.UniqueConstraint(
                fields=["team", "jersey_number"],
                name="unique_team_jersey_number"
            ),
        ]

    def __str__(self):
        return f"{self.name} - {self.team.short_name}"