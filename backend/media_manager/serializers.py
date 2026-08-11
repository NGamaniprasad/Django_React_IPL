from rest_framework import serializers

from .models import Media


class MediaSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = Media

        fields = [
            "id",
            "title",
            "description",
            "file",
            "media_type",
            "player",
            "team",
            "match",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]