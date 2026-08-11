# from rest_framework import serializers
#
# from players.models import Player
#
#
# class PlayerStatisticsSerializer(
#     serializers.ModelSerializer
# ):
#
#     team_name = serializers.CharField(
#         source="team.name",
#         read_only=True
#     )
#
#     class Meta:
#
#         model = Player
#
#         fields = [
#             "id",
#             "name",
#             "team",
#             "team_name",
#             "role",
#             "matches",
#             "runs",
#             "wickets",
#             "strike_rate",
#             "batting_average",
#             "economy",
#         ]

from rest_framework import serializers
from players.models import Player


class PlayerStatisticsSerializer(serializers.ModelSerializer):

    team_name = serializers.CharField(
        source="team.name",
        read_only=True
    )

    class Meta:
        model = Player

        fields = [
            "id",
            "name",
            "team",
            "team_name",
            "role",
            "matches",
            "runs",
            "wickets",
            "strike_rate",
            "batting_average",
            "economy",
        ]


class AdminStatisticsSerializer(serializers.ModelSerializer):

    team_name = serializers.CharField(
        source="team.name",
        read_only=True
    )

    class Meta:
        model = Player

        fields = [
            "id",
            "name",
            "team",
            "team_name",
            "role",
            "matches",
            "runs",
            "wickets",
            "strike_rate",
            "batting_average",
            "economy",
        ]

        read_only_fields = [
            "id",
            "name",
            "team_name",
        ]