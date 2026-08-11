# from django.contrib import admin
#
# # Register your models here.
# from django.contrib import admin
#
# from .models import Match
#
#
# @admin.register(Match)
# class MatchAdmin(admin.ModelAdmin):
#     list_display = (
#         "match_number",
#         "tournament",
#         "team1",
#         "team2",
#         "match_date",
#         "status",
#         "winner",
#     )
#
#     list_filter = (
#         "status",
#         "tournament",
#         "match_date",
#     )
#
#     search_fields = (
#         "team1__name",
#         "team2__name",
#         "venue",
#     )

from django.contrib import admin

from .models import Match


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = (
        "match_number",
        "tournament",
        "team1",
        "team2",
        "venue",
        "match_date",
        "match_time",
        "status",
        "winner",
    )

    search_fields = (
        "venue",
        "team1__name",
        "team2__name",
        "result",
    )

    list_filter = (
        "status",
        "tournament",
        "match_date",
    )

    ordering = (
        "match_date",
        "match_time",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )