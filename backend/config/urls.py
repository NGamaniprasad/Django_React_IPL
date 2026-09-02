from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    path(
        "admin/",
        admin.site.urls
    ),
path(
    "api/auth/login/",
    TokenObtainPairView.as_view(),
    name="token_obtain_pair"
),

path(
    "api/auth/refresh/",
    TokenRefreshView.as_view(),
    name="token_refresh"
),
path(
    "api/auth/",
    include("accounts.urls")
),
path(
        "api/accounts/",
        include("accounts.urls")
    ),

    path(
        "api/",
        include("teams.urls")
    ),

    path(
        "api/",
        include("players.urls")
    ),

    path(
        "api/",
        include("tournaments.urls")
    ),

    path(
        "api/",
        include("matches.urls")
    ),

    path(
        "api/",
        include("points_table.urls")
    ),

    path(
        "api/stats/",
        include("stats.urls")
    ),

    path(
        "api/",
        include("media_manager.urls")
    ),

    path(
        "api/downloads/",
        include("downloads.urls")
    ),
path(
    "api/",
    include("stats.admin_urls")
),

]


urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)