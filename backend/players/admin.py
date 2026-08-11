# from django.contrib import admin
#
# # Register your models here.
# from django.contrib import admin
#
# from .models import Player
#
#
# @admin.register(Player)
# class PlayerAdmin(admin.ModelAdmin):
#     list_display = (
#         "name",
#         "team",
#         "role",
#         "nationality",
#         "matches",
#         "runs",
#         "wickets",
#     )
#
#     list_filter = (
#         "team",
#         "role",
#         "nationality",
#     )
#
#     search_fields = (
#         "name",
#         "team__name",
#     )
###

from django.contrib import admin

from .models import Player


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "team",
        "role",
        "nationality",
        "matches",
        "runs",
        "wickets",
        "strike_rate",
        "batting_average",
        "economy",
    )

    search_fields = (
        "name",
        "team__name",
        "team__short_name",
    )

    list_filter = (
        "team",
        "role",
        "nationality",
    )

    ordering = (
        "name",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )