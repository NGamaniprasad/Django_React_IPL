

##

from django.contrib.auth import get_user_model
from django.contrib.auth import update_session_auth_hash

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (
    RegisterSerializer,
    ProfileSerializer,
    AdminUserSerializer,
    ChangePasswordSerializer,
)


User = get_user_model()


# ==========================================================
# USER REGISTRATION
# ==========================================================

class RegisterView(APIView):

    permission_classes = []

    def post(self, request):

        serializer = RegisterSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.save()

        return Response(
            {
                "message":
                    "Account created successfully.",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                }
            },
            status=status.HTTP_201_CREATED
        )


# ==========================================================
# PROFILE
# ==========================================================

class ProfileView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        serializer = ProfileSerializer(
            request.user,
            context={
                "request": request
            }
        )

        return Response(
            serializer.data
        )

    def patch(self, request):

        serializer = ProfileSerializer(
            request.user,
            data=request.data,
            partial=True,
            context={
                "request": request
            }
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


# ==========================================================
# CHANGE PASSWORD
# ==========================================================

class ChangePasswordView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        serializer = ChangePasswordSerializer(
            data=request.data,
            context={
                "request": request
            }
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = request.user

        user.set_password(
            serializer.validated_data[
                "new_password"
            ]
        )

        user.save(
            update_fields=["password"]
        )

        update_session_auth_hash(
            request,
            user
        )

        return Response(
            {
                "message":
                    "Password changed successfully."
            },
            status=status.HTTP_200_OK
        )


# ==========================================================
# ADMIN USER LIST
# ==========================================================

class AdminUserListView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        if not request.user.is_staff:

            return Response(
                {
                    "detail":
                        "Admin access is required."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        users = User.objects.all().order_by(
            "-date_joined"
        )

        serializer = AdminUserSerializer(
            users,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


# ==========================================================
# ADMIN DELETE USER
# ==========================================================

class AdminUserDeleteView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def delete(self, request, pk):

        if not request.user.is_staff:

            return Response(
                {
                    "detail":
                        "Admin access is required."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        try:

            user = User.objects.get(
                pk=pk
            )

        except User.DoesNotExist:

            return Response(
                {
                    "detail":
                        "User not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if user.id == request.user.id:

            return Response(
                {
                    "detail":
                        "You cannot delete your own admin account."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        if user.is_superuser:

            return Response(
                {
                    "detail":
                        "Superuser accounts are protected."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        if user.is_staff:

            return Response(
                {
                    "detail":
                        "Admin accounts are protected."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        username = user.username

        user.delete()

        return Response(
            {
                "message":
                    f"User '{username}' deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT
        )
