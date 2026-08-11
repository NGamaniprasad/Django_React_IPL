from django.contrib import admin

from .models import Media


@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):

    list_display = [
        "title",
        "media_type",
        "player",
        "team",
        "match",
        "created_at",
    ]

    list_filter = [
        "media_type",
        "created_at",
    ]

    search_fields = [
        "title",
        "description",
    ]