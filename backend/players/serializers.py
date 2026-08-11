from rest_framework import serializers

from .models import Player


class PlayerSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(
        source="team.name",
        read_only=True
    )

    team_short_name = serializers.CharField(
        source="team.short_name",
        read_only=True
    )

    class Meta:
        model = Player

        fields = [
            "id",
            "team",
            "team_name",
            "team_short_name",
            "name",
            "role",
            "nationality",
            "date_of_birth",
            "batting_style",
            "bowling_style",
            "jersey_number",
            "matches",
            "runs",
            "wickets",
            "strike_rate",
            "batting_average",
            "economy",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "team_name",
            "team_short_name",
            "created_at",
            "updated_at",
        ]

    def validate_name(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Player name cannot be empty."
            )

        return value

    def validate_jersey_number(self, value):
        if value is not None and value <= 0:
            raise serializers.ValidationError(
                "Jersey number must be greater than zero."
            )

        return value

    def validate_matches(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Matches cannot be negative."
            )

        return value

    def validate_runs(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Runs cannot be negative."
            )

        return value

    def validate_wickets(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Wickets cannot be negative."
            )

        return value

    def validate_strike_rate(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError(
                "Strike rate cannot be negative."
            )

        return value

    def validate_batting_average(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError(
                "Batting average cannot be negative."
            )

        return value

    def validate_economy(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError(
                "Economy cannot be negative."
            )

        return value