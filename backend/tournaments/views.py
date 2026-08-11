from django.shortcuts import render

# Create your views here.
from rest_framework import filters, viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Tournament
from .permissions import IsAdminOrReadOnly
from .serializers import TournamentSerializer


class TournamentViewSet(viewsets.ModelViewSet):

    serializer_class = TournamentSerializer

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
        "season",
        "status",
    ]

    ordering_fields = [
        "season",
        "start_date",
        "end_date",
        "status",
    ]

    ordering = [
        "-season",
    ]

    def get_queryset(self):
        return Tournament.objects.all()