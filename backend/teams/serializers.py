from rest_framework import serializers

from .models import Team


class TeamSerializer(serializers.ModelSerializer):

    player_count = serializers.SerializerMethodField()

    class Meta:
        model = Team

        fields = [
            "id",
            "name",
            "short_name",
            "logo",
            "captain",
            "coach",
            "home_ground",
            "city",
            "founded_year",
            "player_count",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "player_count",
            "created_at",
            "updated_at",
        ]

    def get_player_count(self, obj):
        return obj.players.count()

    def validate_name(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Team name cannot be empty."
            )

        return value

    def validate_short_name(self, value):
        value = value.strip().upper()

        if not value:
            raise serializers.ValidationError(
                "Team short name cannot be empty."
            )

        if len(value) > 10:
            raise serializers.ValidationError(
                "Team short name cannot exceed 10 characters."
            )

        return value

    def validate_founded_year(self, value):
        if value is not None and value < 1900:
            raise serializers.ValidationError(
                "Founded year must be valid."
            )

        return value