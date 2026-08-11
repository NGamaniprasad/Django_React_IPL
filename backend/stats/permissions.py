from rest_framework.permissions import BasePermission


class IsAdminOrReadOnly(BasePermission):

    def has_permission(self, request, view):

        if not request.user or not request.user.is_authenticated:
            return False

        # Users can view statistics
        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return True

        # Only admin/staff can modify
        return request.user.is_staff or request.user.is_superuser