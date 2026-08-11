from rest_framework import serializers

from .models import Tournament


class TournamentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tournament

        fields = [
            "id",
            "name",
            "season",
            "start_date",
            "end_date",
            "status",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    def validate_season(self, value):
        if value < 2008:
            raise serializers.ValidationError(
                "Tournament season cannot be earlier than 2008."
            )

        return value

    def validate(self, attrs):
        start_date = attrs.get(
            "start_date",
            getattr(self.instance, "start_date", None)
        )

        end_date = attrs.get(
            "end_date",
            getattr(self.instance, "end_date", None)
        )

        if start_date and end_date and end_date < start_date:
            raise serializers.ValidationError({
                "end_date": (
                    "End date cannot be earlier than start date."
                )
            })

        return attrs