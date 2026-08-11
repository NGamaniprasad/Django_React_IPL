from django.core.exceptions import ValidationError
from django.db import models

from teams.models import Team
from tournaments.models import Tournament

class Match(models.Model):

    class Status(models.TextChoices):
        UPCOMING = "UPCOMING", "Upcoming"
        LIVE = "LIVE", "Live"
        COMPLETED = "COMPLETED", "Completed"
        CANCELLED = "CANCELLED", "Cancelled"

    tournament = models.ForeignKey(
        Tournament,
        on_delete=models.CASCADE,
        related_name="matches"
    )

    team1 = models.ForeignKey(
        Team,
        on_delete=models.PROTECT,
        related_name="home_matches"
    )

    team2 = models.ForeignKey(
        Team,
        on_delete=models.PROTECT,
        related_name="away_matches"
    )

    venue = models.CharField(
        max_length=200
    )

    match_number = models.PositiveIntegerField()

    match_date = models.DateField()

    match_time = models.TimeField()

    status = models.CharField(
        max_length=15,
        choices=Status.choices,
        default=Status.UPCOMING
    )

    winner = models.ForeignKey(
        Team,
        on_delete=models.PROTECT,
        related_name="won_matches",
        blank=True,
        null=True
    )

    team1_score = models.PositiveIntegerField(
        default=0
    )

    team2_score = models.PositiveIntegerField(
        default=0
    )

    result = models.CharField(
        max_length=255,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["match_date", "match_time"]

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "tournament",
                    "match_number"
                ],
                name="unique_match_number_per_tournament"
            ),
        ]

        indexes = [
            models.Index(fields=["match_date"]),
            models.Index(fields=["status"]),
            models.Index(fields=["tournament"]),
        ]

    def clean(self):
        if self.team1_id and self.team2_id:
            if self.team1_id == self.team2_id:
                raise ValidationError(
                    "A team cannot play against itself."
                )

        if self.winner_id:
            if self.winner_id not in {
                self.team1_id,
                self.team2_id,
            }:
                raise ValidationError(
                    "Winner must be one of the participating teams."
                )

        if self.team1_score < 0 or self.team2_score < 0:
            raise ValidationError(
                "Match scores cannot be negative."
            )

    def __str__(self):
        return (
            f"{self.team1.short_name} vs "
            f"{self.team2.short_name} - "
            f"{self.tournament.season}"
        )