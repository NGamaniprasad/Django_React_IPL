from django.shortcuts import render

# Create your views here.
import csv

from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from players.models import Player
from teams.models import Team


class PlayerCSVDownloadView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        players = (
            Player.objects
            .select_related("team")
            .all()
        )

        response = HttpResponse(
            content_type="text/csv"
        )

        response[
            "Content-Disposition"
        ] = 'attachment; filename="players.csv"'

        writer = csv.writer(response)

        writer.writerow([
            "ID",
            "Name",
            "Team",
            "Role",
            "Matches",
            "Runs",
            "Wickets",
            "Strike Rate",
            "Batting Average",
            "Economy",
        ])

        for player in players:

            writer.writerow([
                player.id,
                player.name,
                player.team.name
                if player.team else "",
                player.role,
                player.matches,
                player.runs,
                player.wickets,
                player.strike_rate,
                player.batting_average,
                player.economy,
            ])

        return response


class TeamCSVDownloadView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        teams = Team.objects.all()

        response = HttpResponse(
            content_type="text/csv"
        )

        response[
            "Content-Disposition"
        ] = 'attachment; filename="teams.csv"'

        writer = csv.writer(response)

        writer.writerow([
            "ID",
            "Name",
            "Short Name",
            "Captain",
            "Coach",
            "Home Ground",
            "City",
            "Founded Year",
        ])

        for team in teams:

            writer.writerow([
                team.id,
                team.name,
                team.short_name,
                team.captain,
                team.coach,
                team.home_ground,
                team.city,
                team.founded_year,
            ])

        return response