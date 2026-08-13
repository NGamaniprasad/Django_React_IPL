from django.urls import path

from .views import (
    RegisterView,
    ProfileView,
    ChangePasswordView,
    AdminUserListView,
    AdminUserDeleteView,
)


urlpatterns = [

    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),

    path(
        "profile/",
        ProfileView.as_view(),
        name="profile"
    ),

    path(
        "change-password/",
        ChangePasswordView.as_view(),
        name="change-password"
    ),

    path(
        "users/",
        AdminUserListView.as_view(),
        name="admin-users"
    ),

    path(
        "users/<int:pk>/",
        AdminUserDeleteView.as_view(),
        name="admin-user-delete"
    ),
]
