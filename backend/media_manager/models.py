# from django.db import models
#
# # Create your models here.
# from django.db import models
#
# from matches.models import Match
# from players.models import Player
# from teams.models import Team
#
#
# class Media(models.Model):
#
#     class MediaType(models.TextChoices):
#         IMAGE = "IMAGE", "Image"
#         VIDEO = "VIDEO", "Video"
#         DOCUMENT = "DOCUMENT", "Document"
#
#     title = models.CharField(
#         max_length=200
#     )
#
#     description = models.TextField(
#         blank=True
#     )
#
#     file = models.FileField(
#         upload_to="media/"
#     )
#
#     media_type = models.CharField(
#         max_length=15,
#         choices=MediaType.choices
#     )
#
#     player = models.ForeignKey(
#         Player,
#         on_delete=models.CASCADE,
#         related_name="media",
#         blank=True,
#         null=True
#     )
#
#     team = models.ForeignKey(
#         Team,
#         on_delete=models.CASCADE,
#         related_name="media",
#         blank=True,
#         null=True
#     )
#
#     match = models.ForeignKey(
#         Match,
#         on_delete=models.CASCADE,
#         related_name="media",
#         blank=True,
#         null=True
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
#     class Meta:
#         ordering = ["-created_at"]
#
#     def __str__(self):
#         return self.title

from django.core.exceptions import ValidationError
from django.db import models

from matches.models import Match
from players.models import Player
from teams.models import Team


class Media(models.Model):

    class MediaType(models.TextChoices):
        IMAGE = "IMAGE", "Image"
        DOCUMENT = "DOCUMENT", "Document"
        VIDEO = "VIDEO", "Video"

    title = models.CharField(
        max_length=200
    )

    description = models.TextField(
        blank=True
    )

    file = models.FileField(
        upload_to="media/"
    )

    media_type = models.CharField(
        max_length=20,
        choices=MediaType.choices
    )

    player = models.ForeignKey(
        Player,
        on_delete=models.CASCADE,
        related_name="media",
        null=True,
        blank=True
    )

    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name="media",
        null=True,
        blank=True
    )

    match = models.ForeignKey(
        Match,
        on_delete=models.CASCADE,
        related_name="media",
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["-created_at"]

        indexes = [
            models.Index(fields=["media_type"]),
            models.Index(fields=["player"]),
            models.Index(fields=["team"]),
            models.Index(fields=["match"]),
        ]

    def clean(self):

        if not any([
            self.player,
            self.team,
            self.match
        ]):
            raise ValidationError(
                "Media must be associated with a player, team, or match."
            )

    def __str__(self):
        return self.title