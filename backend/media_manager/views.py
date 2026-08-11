from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .models import Media
from .serializers import MediaSerializer


class MediaViewSet(ModelViewSet):

    serializer_class = MediaSerializer
    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):

        return (
            Media.objects
            .select_related(
                "player",
                "team",
                "match"
            )
            .all()
        )