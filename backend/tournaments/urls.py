from rest_framework.routers import DefaultRouter

from .views import TournamentViewSet


router = DefaultRouter()

router.register(
    r"tournaments",
    TournamentViewSet,
    basename="tournament"
)

urlpatterns = router.urls