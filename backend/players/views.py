from django.shortcuts import render

# Create your views here.
from django.db.models import Q
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from teams.models import Team

from .models import Player
from .permissions import IsAdminOrReadOnly
from .serializers import PlayerSerializer


class PlayerViewSet(viewsets.ModelViewSet):

    serializer_class = PlayerSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdminOrReadOnly,
    ]

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = [
        "name",
        "nationality",
        "batting_style",
        "bowling_style",
        "team__name",
        "team__short_name",
    ]

    ordering_fields = [
        "name",
        "runs",
        "wickets",
        "matches",
        "strike_rate",
        "batting_average",
        "economy",
    ]

    ordering = [
        "name",
    ]

    def get_queryset(self):
        queryset = Player.objects.select_related(
            "team"
        ).all()

        team_id = self.request.query_params.get("team")

        if team_id:
            queryset = queryset.filter(
                team_id=team_id
            )

        role = self.request.query_params.get("role")

        if role:
            queryset = queryset.filter(
                role=role.upper()
            )

        return queryset

    @action(
        detail=False,
        methods=["get"],
        url_path="team/(?P<team_id>[^/.]+)"
    )
    def team_players(self, request, team_id=None):

        try:
            team = Team.objects.get(
                id=team_id
            )
        except Team.DoesNotExist:
            return Response(
                {
                    "detail": "Team not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        players = self.get_queryset().filter(
            team=team
        )

        page = self.paginate_queryset(players)

        if page is not None:
            serializer = self.get_serializer(
                page,
                many=True
            )
            return self.get_paginated_response(
                serializer.data
            )

        serializer = self.get_serializer(
            players,
            many=True
        )

        return Response(serializer.data)