from rest_framework.permissions import BasePermission


class IsAdminUserRole(BasePermission):
    """
    Allows access only to authenticated users
    whose role is ADMIN.
    """

    message = "Admin access is required."

    def has_permission(self, request, view):

        return (
            request.user
            and request.user.is_authenticated
            and request.user.is_staff
        )


class IsRegularUser(BasePermission):
    """
    Allows authenticated non-admin users.
    """

    message = "Regular user access is required."

    def has_permission(self, request, view):

        return (
            request.user
            and request.user.is_authenticated
            and not request.user.is_staff
        )