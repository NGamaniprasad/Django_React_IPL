from django.db import models

# Create your models here.
from django.core.validators import MinValueValidator
from django.db import models

from teams.models import Team
from tournaments.models import Tournament


class PointsTable(models.Model):

    tournament = models.ForeignKey(
        Tournament,
        on_delete=models.CASCADE,
        related_name="points_table"
    )

    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name="points_entries"
    )

    matches_played = models.PositiveIntegerField(
        default=0
    )

    wins = models.PositiveIntegerField(
        default=0
    )

    losses = models.PositiveIntegerField(
        default=0
    )

    no_results = models.PositiveIntegerField(
        default=0
    )

    points = models.PositiveIntegerField(
        default=0
    )

    net_run_rate = models.DecimalField(
        max_digits=6,
        decimal_places=3,
        default=0,
        validators=[
            MinValueValidator(-999)
        ]
    )

    position = models.PositiveIntegerField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["position"]

        constraints = [
            models.UniqueConstraint(
                fields=["tournament", "team"],
                name="unique_team_per_tournament_points"
            ),
        ]

        indexes = [
            models.Index(fields=["tournament"]),
            models.Index(fields=["team"]),
            models.Index(fields=["position"]),
        ]

    def __str__(self):
        return (
            f"{self.tournament.season} - "
            f"{self.team.short_name}"
        )