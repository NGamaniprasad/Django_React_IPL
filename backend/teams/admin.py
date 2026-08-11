# from django.contrib import admin
#
# # Register your models here.
# from django.contrib import admin
#
# from .models import Team
#
#
# @admin.register(Team)
# class TeamAdmin(admin.ModelAdmin):
#     list_display = (
#         "name",
#         "short_name",
#         "captain",
#         "coach",
#         "city",
#         "founded_year",
#     )
#
#     search_fields = (
#         "name",
#         "short_name",
#         "city",
#     )

###3
from django.contrib import admin

from .models import Team


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "short_name",
        "captain",
        "coach",
        "city",
        "founded_year",
        "created_at",
    )

    search_fields = (
        "name",
        "short_name",
        "captain",
        "coach",
        "city",
    )

    list_filter = (
        "city",
        "founded_year",
    )

    ordering = (
        "name",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )