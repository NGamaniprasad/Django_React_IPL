from rest_framework.permissions import BasePermission


class IsAdminOrReadOnly(BasePermission):
    """
    Authenticated users can view matches.
    Only Django staff/superuser users can create,
    update, or delete matches.
    """

    def has_permission(self, request, view):

        # User must be authenticated
        if not request.user or not request.user.is_authenticated:
            return False

        # Authenticated users can view
        if request.method in (
            "GET",
            "HEAD",
            "OPTIONS",
        ):
            return True

        # Superuser can create/update/delete
        if request.user.is_superuser:
            return True

        # Staff can create/update/delete
        if request.user.is_staff:
            return True

        return False