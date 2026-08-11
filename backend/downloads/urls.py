from django.urls import path

from .views import (
    PlayerCSVDownloadView,
    TeamCSVDownloadView,
)


urlpatterns = [

    path(
        "players/csv/",
        PlayerCSVDownloadView.as_view(),
        name="players-csv"
    ),

    path(
        "teams/csv/",
        TeamCSVDownloadView.as_view(),
        name="teams-csv"
    ),
]