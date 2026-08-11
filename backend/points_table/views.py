from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import action
#from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from tournaments.models import Tournament

from .models import PointsTable
from .serializers import PointsTableSerializer

from rest_framework.permissions import IsAuthenticated

from .permissions import IsAdminOrReadOnly
class PointsTableViewSet(ModelViewSet):

    serializer_class = PointsTableSerializer
    permission_classes = [IsAuthenticated,IsAdminOrReadOnly,]

    def get_queryset(self):
        queryset = (
            PointsTable.objects
            .select_related("team", "tournament")
            .all()
        )

        tournament = self.request.query_params.get("tournament")

        if tournament:
            queryset = queryset.filter(
                tournament_id=tournament
            )

        return queryset.order_by("position")

    @action(
        detail=False,
        methods=["post"],
        url_path="recalculate"
    )
    def recalculate(self, request):

        tournament_id = request.data.get("tournament")

        if not tournament_id:
            return Response(
                {
                    "detail": "Tournament ID is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            tournament = Tournament.objects.get(
                id=tournament_id
            )
        except Tournament.DoesNotExist:
            return Response(
                {
                    "detail": "Tournament not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Calculation will be connected to completed
        # match results in the next improvement.
        return Response(
            {
                "detail": (
                    "Points table recalculation endpoint "
                    "is ready."
                ),
                "tournament": tournament.id,
                "season": tournament.season,
            },
            status=status.HTTP_200_OK
        )