from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from players.models import Player
from .permissions import IsAdminOrReadOnly
from .serializers import AdminStatisticsSerializer


class AdminStatisticsViewSet(viewsets.ModelViewSet):

    serializer_class = AdminStatisticsSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdminOrReadOnly,
    ]

    queryset = Player.objects.select_related(
        "team"
    ).all()

    search_fields = [
        "name",
        "team__name",
        "role",
    ]