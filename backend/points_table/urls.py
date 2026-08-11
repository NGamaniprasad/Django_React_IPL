from rest_framework.routers import DefaultRouter

from .views import PointsTableViewSet


router = DefaultRouter()

router.register(
    r"points-table",
    PointsTableViewSet,
    basename="points-table"
)

urlpatterns = router.urls