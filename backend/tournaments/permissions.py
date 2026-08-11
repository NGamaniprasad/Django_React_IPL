# from rest_framework.permissions import BasePermission
#
#
# class IsAdminOrReadOnly(BasePermission):
#     """
#     Authenticated users can view tournaments.
#     Only ADMIN users can create, update, or delete tournaments.
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
    Authenticated users can view tournaments.
    Only Django staff/superuser/admin users can modify tournaments.
    """

    def has_permission(self, request, view):

        if not request.user or not request.user.is_authenticated:
            return False

        # Everyone authenticated can read
        if request.method in (
            "GET",
            "HEAD",
            "OPTIONS",
        ):
            return True

        # Only staff/superuser can create/update/delete
        return (
            request.user.is_staff
            or request.user.is_superuser
        )