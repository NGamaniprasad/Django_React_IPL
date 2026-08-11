# from django.contrib import admin
#
# # Register your models here.
# from django.contrib import admin
#
# from .models import PointsTable
#
#
# @admin.register(PointsTable)
# class PointsTableAdmin(admin.ModelAdmin):
#     list_display = (
#         "position",
#         "tournament",
#         "team",
#         "matches_played",
#         "wins",
#         "losses",
#         "no_results",
#         "points",
#         "net_run_rate",
#     )
#
#     list_filter = (
#         "tournament",
#         "team",
#     )

from django.contrib import admin

from .models import PointsTable


@admin.register(PointsTable)
class PointsTableAdmin(admin.ModelAdmin):
    list_display = (
        "position",
        "tournament",
        "team",
        "matches_played",
        "wins",
        "losses",
        "no_results",
        "points",
        "net_run_rate",
    )

    search_fields = (
        "team__name",
        "team__short_name",
    )

    list_filter = (
        "tournament",
        "team",
    )

    ordering = (
        "position",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )