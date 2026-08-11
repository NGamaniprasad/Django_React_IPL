#
#
# from rest_framework import serializers
#
# from .models import PointsTable
#
#
# class PointsTableSerializer(
#     serializers.ModelSerializer
# ):
#
#     team_name = serializers.CharField(
#         source="team.name",
#         read_only=True
#     )
#
#     tournament_name = serializers.CharField(
#         source="tournament.name",
#         read_only=True
#     )
#
#     season = serializers.IntegerField(
#         source="tournament.season",
#         read_only=True
#     )
#
#     class Meta:
#
#         model = PointsTable
#
#         fields = [
#             "id",
#             "tournament",
#             "tournament_name",
#             "season",
#             "team",
#             "team_name",
#             "matches_played",
#             "wins",
#             "losses",
#             "no_results",
#             "points",
#             "net_run_rate",
#             "position",
#         ]
#
#         read_only_fields = [
#             "id",
#             "tournament_name",
#             "season",
#             "team_name",
#         ]
#
#     def validate(self, attrs):
#
#         matches_played = attrs.get(
#             "matches_played",
#             getattr(
#                 self.instance,
#                 "matches_played",
#                 0
#             )
#         )
#
#         wins = attrs.get(
#             "wins",
#             getattr(
#                 self.instance,
#                 "wins",
#                 0
#             )
#         )
#
#         losses = attrs.get(
#             "losses",
#             getattr(
#                 self.instance,
#                 "losses",
#                 0
#             )
#         )
#
#         no_results = attrs.get(
#             "no_results",
#             getattr(
#                 self.instance,
#                 "no_results",
#                 0
#             )
#         )
#
#         if (
#             wins
#             + losses
#             + no_results
#             != matches_played
#         ):
#             raise serializers.ValidationError({
#                 "matches_played": (
#                     "Matches played must equal "
#                     "wins + losses + no results."
#                 )
#             })
#
#         if wins * 2 + no_results != attrs.get(
#             "points",
#             getattr(
#                 self.instance,
#                 "points",
#                 0
#             )
#         ):
#             raise serializers.ValidationError({
#                 "points": (
#                     "Points should normally equal "
#                     "(wins × 2) + no results."
#                 )
#             })
#
#         if attrs.get("position", 0) < 0:
#             raise serializers.ValidationError({
#                 "position": "Position cannot be negative."
#             })
#
#         return attrs

from rest_framework import serializers

from .models import PointsTable


class PointsTableSerializer(serializers.ModelSerializer):

    team_name = serializers.CharField(
        source="team.name",
        read_only=True
    )

    tournament_name = serializers.CharField(
        source="tournament.name",
        read_only=True
    )

    season = serializers.IntegerField(
        source="tournament.season",
        read_only=True
    )

    class Meta:

        model = PointsTable

        fields = [
            "id",
            "tournament",
            "tournament_name",
            "season",
            "team",
            "team_name",
            "matches_played",
            "wins",
            "losses",
            "no_results",
            "points",
            "net_run_rate",
            "position",
        ]

        read_only_fields = [
            "id",
            "tournament_name",
            "season",
            "team_name",
            "points",
        ]

    def validate(self, attrs):

        matches_played = attrs.get(
            "matches_played",
            getattr(self.instance, "matches_played", 0)
        )

        wins = attrs.get(
            "wins",
            getattr(self.instance, "wins", 0)
        )

        losses = attrs.get(
            "losses",
            getattr(self.instance, "losses", 0)
        )

        no_results = attrs.get(
            "no_results",
            getattr(self.instance, "no_results", 0)
        )

        if wins + losses + no_results > matches_played:
            raise serializers.ValidationError({
                "matches_played":
                    "Wins + losses + no results cannot exceed matches played."
            })

        return attrs

    def create(self, validated_data):

        validated_data["points"] = (
            validated_data.get("wins", 0) * 2
            + validated_data.get("no_results", 0)
        )

        return super().create(validated_data)

    def update(self, instance, validated_data):

        wins = validated_data.get(
            "wins",
            instance.wins
        )

        no_results = validated_data.get(
            "no_results",
            instance.no_results
        )

        validated_data["points"] = (
            wins * 2
            + no_results
        )

        return super().update(
            instance,
            validated_data
        )