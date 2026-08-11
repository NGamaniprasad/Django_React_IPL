from django.shortcuts import render

# Create your views here.
from django.db.models import Q
from rest_framework import filters, viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Match
from .permissions import IsAdminOrReadOnly
from .serializers import MatchSerializer


class MatchViewSet(viewsets.ModelViewSet):

    serializer_class = MatchSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdminOrReadOnly,
    ]

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = [
        "venue",
        "team1__name",
        "team2__name",
        "tournament__name",
        "tournament__season",
        "status",
    ]

    ordering_fields = [
        "match_date",
        "match_time",
        "match_number",
        "status",
    ]

    ordering = [
        "match_date",
        "match_time",
    ]

    def get_queryset(self):

        queryset = Match.objects.select_related(
            "tournament",
            "team1",
            "team2",
            "winner",
        ).all()

        tournament = self.request.query_params.get(
            "tournament"
        )

        if tournament:
            queryset = queryset.filter(
                tournament_id=tournament
            )

        team = self.request.query_params.get(
            "team"
        )

        if team:
            queryset = queryset.filter(
                Q(team1_id=team)
                | Q(team2_id=team)
            )

        status = self.request.query_params.get(
            "status"
        )

        if status:
            queryset = queryset.filter(
                status=status.upper()
            )

        match_date = self.request.query_params.get(
            "date"
        )

        if match_date:
            queryset = queryset.filter(
                match_date=match_date
            )

        venue = self.request.query_params.get(
            "venue"
        )

        if venue:
            queryset = queryset.filter(
                venue__icontains=venue
            )

        return queryset