


from rest_framework import serializers

from .models import Match


class MatchSerializer(serializers.ModelSerializer):

    tournament_name = serializers.CharField(
        source="tournament.name",
        read_only=True
    )

    team1_name = serializers.CharField(
        source="team1.name",
        read_only=True
    )

    team2_name = serializers.CharField(
        source="team2.name",
        read_only=True
    )

    winner_name = serializers.CharField(
        source="winner.name",
        read_only=True,
        allow_null=True
    )

    class Meta:
        model = Match

        fields = [
            "id",
            "tournament",
            "tournament_name",
            "team1",
            "team1_name",
            "team2",
            "team2_name",
            "venue",
            "match_number",
            "match_date",
            "match_time",
            "status",
            "winner",
            "winner_name",
            "team1_score",
            "team2_score",
            "result",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "tournament_name",
            "team1_name",
            "team2_name",
            "winner_name",
            "created_at",
            "updated_at",
        ]

    def validate(self, attrs):

        team1 = attrs.get(
            "team1",
            getattr(self.instance, "team1", None)
        )

        team2 = attrs.get(
            "team2",
            getattr(self.instance, "team2", None)
        )

        # --------------------------------
        # TEAM 1 / TEAM 2 VALIDATION
        # --------------------------------

        if team1 and team2:

            if team1.pk == team2.pk:
                raise serializers.ValidationError({
                    "team2": (
                        "Team 1 and Team 2 "
                        "cannot be the same."
                    )
                })

        # --------------------------------
        # TOURNAMENT DATE VALIDATION
        # --------------------------------

        match_date = attrs.get(
            "match_date",
            getattr(
                self.instance,
                "match_date",
                None
            )
        )

        tournament = attrs.get(
            "tournament",
            getattr(
                self.instance,
                "tournament",
                None
            )
        )

        if tournament and match_date:

            if (
                tournament.start_date
                and match_date < tournament.start_date
            ):
                raise serializers.ValidationError({
                    "match_date": (
                        "Match date cannot be before "
                        "the tournament start date."
                    )
                })

            if (
                tournament.end_date
                and match_date > tournament.end_date
            ):
                raise serializers.ValidationError({
                    "match_date": (
                        "Match date cannot be after "
                        "the tournament end date."
                    )
                })

        # --------------------------------
        # WINNER VALIDATION
        # --------------------------------

        winner = attrs.get(
            "winner",
            getattr(
                self.instance,
                "winner",
                None
            )
        )

        if winner:

            participating_team_ids = {
                team1.pk,
                team2.pk,
            }

            if winner.pk not in participating_team_ids:

                raise serializers.ValidationError({
                    "winner": (
                        "Winner must be one of the "
                        "participating teams."
                    )
                })

        # --------------------------------
        # COMPLETED VALIDATION
        # --------------------------------

        status = attrs.get(
            "status",
            getattr(
                self.instance,
                "status",
                Match.Status.UPCOMING
            )
        )

        if (
            status == Match.Status.COMPLETED
            and not winner
        ):
            raise serializers.ValidationError({
                "winner": (
                    "Completed matches must have "
                    "a winner."
                )
            })

        return attrs