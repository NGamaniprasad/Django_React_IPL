from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from players.models import Player

from .serializers import PlayerStatisticsSerializer


class StatisticsView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        players = (
            Player.objects
            .select_related("team")
            .all()
        )

        team = request.query_params.get("team")

        if team:
            players = players.filter(
                team_id=team
            )

        role = request.query_params.get("role")

        if role:
            players = players.filter(
                role=role
            )

        top_run_scorer = (
            players
            .order_by("-runs")
            .first()
        )

        top_wicket_taker = (
            players
            .order_by("-wickets")
            .first()
        )

        best_average = (
            players
            .order_by("-batting_average")
            .first()
        )

        best_strike_rate = (
            players
            .order_by("-strike_rate")
            .first()
        )

        best_economy = (
            players
            .filter(economy__gt=0)
            .order_by("economy")
            .first()
        )

        return Response(
            {
                "top_run_scorer": (
                    PlayerStatisticsSerializer(
                        top_run_scorer
                    ).data
                    if top_run_scorer
                    else None
                ),

                "top_wicket_taker": (
                    PlayerStatisticsSerializer(
                        top_wicket_taker
                    ).data
                    if top_wicket_taker
                    else None
                ),

                "best_batting_average": (
                    PlayerStatisticsSerializer(
                        best_average
                    ).data
                    if best_average
                    else None
                ),

                "best_strike_rate": (
                    PlayerStatisticsSerializer(
                        best_strike_rate
                    ).data
                    if best_strike_rate
                    else None
                ),

                "best_economy": (
                    PlayerStatisticsSerializer(
                        best_economy
                    ).data
                    if best_economy
                    else None
                ),
            }
        )