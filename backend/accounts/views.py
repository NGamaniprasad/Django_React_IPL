# from django.shortcuts import render
#
# # Create your views here.
# from django.contrib.auth import get_user_model
# from rest_framework import generics
# from rest_framework.permissions import AllowAny
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
#
# from .serializers import UserRegistrationSerializer
#
#
# User = get_user_model()
#
#
# class UserRegistrationView(
#     generics.CreateAPIView
# ):
#
#     queryset = User.objects.all()
#
#     serializer_class = (
#         UserRegistrationSerializer
#     )
#
#     permission_classes = [
#         AllowAny
#     ]
#
#
# class ProfileView(APIView):
#
#     permission_classes = [
#         IsAuthenticated
#     ]
#
#     def get(self, request):
#
#         user = request.user
#
#         return Response(
#             {
#                 "id": user.id,
#                 "username": user.username,
#                 "email": user.email,
#                 "first_name": user.first_name,
#                 "is_staff": user.is_staff,
#             }
#         )
#
# from django.contrib.auth import get_user_model
#
# from rest_framework import generics
# from rest_framework.permissions import AllowAny
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework.viewsets import ModelViewSet
#
# from .serializers import (
#     UserRegistrationSerializer,
#     AdminUserSerializer,
# )
#
# from .permissions import IsAdminUserRole
#
#
# User = get_user_model()
#
#
# class UserRegistrationView(
#     generics.CreateAPIView
# ):
#
#     queryset = User.objects.all()
#
#     serializer_class = (
#         UserRegistrationSerializer
#     )
#
#     permission_classes = [
#         AllowAny
#     ]
#
#
# class ProfileView(APIView):
#
#     permission_classes = [
#         IsAuthenticated
#     ]
#
#     def get(self, request):
#
#         user = request.user
#
#         return Response(
#             {
#                 "id": user.id,
#                 "username": user.username,
#                 "email": user.email,
#                 "first_name": user.first_name,
#                 "is_staff": user.is_staff,
#             }
#         )
#
#
# # ==========================================================
# # ADMIN USER MANAGEMENT
# # ==========================================================
#
# class AdminUserViewSet(ModelViewSet):
#
#     queryset = (
#         User.objects
#         .select_related("profile")
#         .all()
#         .order_by("-date_joined")
#     )
#
#     serializer_class = AdminUserSerializer
#
#     permission_classes = [
#         IsAdminUserRole
#     ]
#
#     def destroy(self, request, *args, **kwargs):
#
#         user = self.get_object()
#
#         # Never allow an admin to delete himself
#         if user.id == request.user.id:
#
#             return Response(
#                 {
#                     "detail":
#                     "You cannot delete your own admin account."
#                 },
#                 status=400
#             )
#
#         # Protect superuser accounts
#         if user.is_superuser:
#
#             return Response(
#                 {
#                     "detail":
#                     "Superuser accounts cannot be deleted."
#                 },
#                 status=403
#             )
#
#         user.delete()
#
#         return Response(
#             {
#                 "detail":
#                 "User deleted successfully."
#             },
#             status=200
#         )

###working
# from django.contrib.auth import get_user_model
# from django.contrib.auth import update_session_auth_hash
#
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
#
# from .serializers import (
#     ProfileSerializer,
#     ChangePasswordSerializer,
# )
#
#
# User = get_user_model()
#
#
# class ProfileView(APIView):
#
#     permission_classes = [
#         IsAuthenticated
#     ]
#
#     def get(self, request):
#
#         serializer = ProfileSerializer(
#             request.user,
#             context={
#                 "request": request
#             }
#         )
#
#         return Response(
#             serializer.data
#         )
#
#     def patch(self, request):
#
#         serializer = ProfileSerializer(
#             request.user,
#             data=request.data,
#             partial=True,
#             context={
#                 "request": request
#             }
#         )
#
#         serializer.is_valid(
#             raise_exception=True
#         )
#
#         serializer.save()
#
#         return Response(
#             serializer.data,
#             status=status.HTTP_200_OK
#         )
#
#
# class ChangePasswordView(APIView):
#
#     permission_classes = [
#         IsAuthenticated
#     ]
#
#     def post(self, request):
#
#         serializer = ChangePasswordSerializer(
#             data=request.data,
#             context={
#                 "request": request
#             }
#         )
#
#         serializer.is_valid(
#             raise_exception=True
#         )
#
#         user = request.user
#
#         user.set_password(
#             serializer.validated_data[
#                 "new_password"
#             ]
#         )
#
#         user.save(
#             update_fields=["password"]
#         )
#
#         # Important if Django sessions are used.
#         update_session_auth_hash(
#             request,
#             user
#         )
#
#         return Response(
#             {
#                 "message":
#                     "Password changed successfully."
#             },
#             status=status.HTTP_200_OK
#         )


####

# from django.contrib.auth import get_user_model
# from django.contrib.auth import update_session_auth_hash
#
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
#
# from .serializers import (
#     ProfileSerializer,
#     AdminUserSerializer,
#     ChangePasswordSerializer,
# )
#
#
# User = get_user_model()
#
#
# # ==========================================================
# # PROFILE
# # ==========================================================
#
# class ProfileView(APIView):
#
#     permission_classes = [
#         IsAuthenticated
#     ]
#
#     def get(self, request):
#
#         serializer = ProfileSerializer(
#             request.user,
#             context={
#                 "request": request
#             }
#         )
#
#         return Response(
#             serializer.data
#         )
#
#     def patch(self, request):
#
#         serializer = ProfileSerializer(
#             request.user,
#             data=request.data,
#             partial=True,
#             context={
#                 "request": request
#             }
#         )
#
#         serializer.is_valid(
#             raise_exception=True
#         )
#
#         serializer.save()
#
#         return Response(
#             serializer.data,
#             status=status.HTTP_200_OK
#         )
#
#
# # ==========================================================
# # CHANGE PASSWORD
# # ==========================================================
#
# class ChangePasswordView(APIView):
#
#     permission_classes = [
#         IsAuthenticated
#     ]
#
#     def post(self, request):
#
#         serializer = ChangePasswordSerializer(
#             data=request.data,
#             context={
#                 "request": request
#             }
#         )
#
#         serializer.is_valid(
#             raise_exception=True
#         )
#
#         user = request.user
#
#         user.set_password(
#             serializer.validated_data[
#                 "new_password"
#             ]
#         )
#
#         user.save(
#             update_fields=["password"]
#         )
#
#         update_session_auth_hash(
#             request,
#             user
#         )
#
#         return Response(
#             {
#                 "message":
#                     "Password changed successfully."
#             },
#             status=status.HTTP_200_OK
#         )
#
#
# # ==========================================================
# # ADMIN USER LIST
# # ==========================================================
#
# class AdminUserListView(APIView):
#
#     permission_classes = [
#         IsAuthenticated
#     ]
#
#     def get(self, request):
#
#         # Only staff/admin can access
#         if not request.user.is_staff:
#
#             return Response(
#                 {
#                     "detail":
#                         "Admin access is required."
#                 },
#                 status=status.HTTP_403_FORBIDDEN
#             )
#
#         users = User.objects.all().order_by(
#             "-date_joined"
#         )
#
#         serializer = AdminUserSerializer(
#             users,
#             many=True
#         )
#
#         return Response(
#             serializer.data,
#             status=status.HTTP_200_OK
#         )
#
#
# # ==========================================================
# # ADMIN DELETE USER
# # ==========================================================
#
# class AdminUserDeleteView(APIView):
#
#     permission_classes = [
#         IsAuthenticated
#     ]
#
#     def delete(self, request, pk):
#
#         # Only staff/admin
#         if not request.user.is_staff:
#
#             return Response(
#                 {
#                     "detail":
#                         "Admin access is required."
#                 },
#                 status=status.HTTP_403_FORBIDDEN
#             )
#
#         try:
#
#             user = User.objects.get(
#                 pk=pk
#             )
#
#         except User.DoesNotExist:
#
#             return Response(
#                 {
#                     "detail":
#                         "User not found."
#                 },
#                 status=status.HTTP_404_NOT_FOUND
#             )
#
#         # ==================================================
#         # CANNOT DELETE YOURSELF
#         # ==================================================
#
#         if user.id == request.user.id:
#
#             return Response(
#                 {
#                     "detail":
#                         "You cannot delete your own admin account."
#                 },
#                 status=status.HTTP_403_FORBIDDEN
#             )
#
#         # ==================================================
#         # CANNOT DELETE SUPERUSER
#         # ==================================================
#
#         if user.is_superuser:
#
#             return Response(
#                 {
#                     "detail":
#                         "Superuser accounts are protected."
#                 },
#                 status=status.HTTP_403_FORBIDDEN
#             )
#
#         # ==================================================
#         # CANNOT DELETE OTHER ADMIN
#         # ==================================================
#
#         if user.is_staff:
#
#             return Response(
#                 {
#                     "detail":
#                         "Admin accounts are protected."
#                 },
#                 status=status.HTTP_403_FORBIDDEN
#             )
#
#         username = user.username
#
#         user.delete()
#
#         return Response(
#             {
#                 "message":
#                     f"User '{username}' deleted successfully."
#             },
#             status=status.HTTP_204_NO_CONTENT
#         )


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