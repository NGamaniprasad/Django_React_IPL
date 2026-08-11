from rest_framework.routers import DefaultRouter

from .admin_views import AdminStatisticsViewSet


router = DefaultRouter()

router.register(
    r"admin/statistics",
    AdminStatisticsViewSet,
    basename="admin-statistics"
)

urlpatterns = router.urls