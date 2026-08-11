from rest_framework.permissions import BasePermission


class IsAdminOrReadOnly(BasePermission):
    """
    Authenticated users can read team data.
    Only ADMIN users can create, update, or delete.
    """

    def has_permission(self, request, view):

        if not request.user or not request.user.is_authenticated:
            return False

        if request.method in (
            "GET",
            "HEAD",
            "OPTIONS",
        ):
            return True

        profile = getattr(request.user, "profile", None)

        return (
            profile is not None
            and profile.role == "ADMIN"
            and profile.is_active
        )