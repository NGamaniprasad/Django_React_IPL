# from django.contrib import admin
#
# # Register your models here.
# from django.contrib import admin
#
# from .models import Tournament
#
#
# @admin.register(Tournament)
# class TournamentAdmin(admin.ModelAdmin):
#     list_display = (
#         "name",
#         "season",
#         "start_date",
#         "end_date",
#         "status",
#     )
#
#     list_filter = (
#         "status",
#         "season",
#     )
#
#     search_fields = (
#         "name",
#     )

###
from django.contrib import admin

from .models import Tournament


@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "season",
        "start_date",
        "end_date",
        "status",
    )

    search_fields = (
        "name",
        "season",
    )

    list_filter = (
        "status",
        "season",
    )

    ordering = (
        "-season",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )