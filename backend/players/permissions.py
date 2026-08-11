# from rest_framework.permissions import BasePermission
#
#
# class IsAdminOrReadOnly(BasePermission):
#     """
#     Authenticated users can view players.
#     Only ADMIN users can create, update, or delete players.
#     """
#
#     def has_permission(self, request, view):
#
#         if not request.user or not request.user.is_authenticated:
#             return False
#
#         if request.method in (
#             "GET",
#             "HEAD",
#             "OPTIONS",
#         ):
#             return True
#
#         profile = getattr(request.user, "profile", None)
#
#         return (
#             profile is not None
#             and profile.role == "ADMIN"
#             and profile.is_active
#         )

from rest_framework.permissions import BasePermission


class IsAdminOrReadOnly(BasePermission):
    """
    Authenticated users can read.
    Staff/superuser administrators can create, update and delete.
    """

    def has_permission(self, request, view):

        # User must be logged in
        if not request.user or not request.user.is_authenticated:
            return False

        # Everyone authenticated can view
        if request.method in (
            "GET",
            "HEAD",
            "OPTIONS",
        ):
            return True

        # Only Django staff/superuser can modify
        return (
            request.user.is_staff
            or request.user.is_superuser
        )