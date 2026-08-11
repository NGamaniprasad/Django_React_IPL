# from django.urls import path
#
# from .views import (
#     ProfileView,
#     UserRegistrationView,
# )
#
#
# urlpatterns = [
#
#     path(
#         "register/",
#         UserRegistrationView.as_view(),
#         name="user-register"
#     ),
#
#     path(
#         "profile/",
#         ProfileView.as_view(),
#         name="profile"
#     ),
# ]
#
# from django.urls import path
# from rest_framework.routers import DefaultRouter
#
# from .views import (
#     ProfileView,
#     UserRegistrationView,
#     AdminUserViewSet,
# )
#
#
# router = DefaultRouter()
#
# router.register(
#     r"users",
#     AdminUserViewSet,
#     basename="admin-users"
# )
#
#
# urlpatterns = [
#
#     path(
#         "register/",
#         UserRegistrationView.as_view(),
#         name="user-register"
#     ),
#
#     path(
#         "profile/",
#         ProfileView.as_view(),
#         name="profile"
#     ),
#
# ]
#
# urlpatterns += router.urls

#WORKING

# from django.urls import path
#
# from .views import (
#     ProfileView,
#     ChangePasswordView,
# )
#
#
# urlpatterns = [
#
#     path(
#         "profile/",
#         ProfileView.as_view(),
#         name="profile"
#     ),
#
#     path(
#         "change-password/",
#         ChangePasswordView.as_view(),
#         name="change-password"
#     ),
#
# ]

####

from django.urls import path

from .views import (
    ProfileView,
    ChangePasswordView,
    AdminUserListView,
    AdminUserDeleteView,
)


urlpatterns = [

    # ======================================================
    # USER PROFILE
    # ======================================================

    path(
        "profile/",
        ProfileView.as_view(),
        name="profile"
    ),

    # ======================================================
    # CHANGE PASSWORD
    # ======================================================

    path(
        "change-password/",
        ChangePasswordView.as_view(),
        name="change-password"
    ),

    # ======================================================
    # ADMIN - ALL USERS
    # ======================================================

    path(
        "users/",
        AdminUserListView.as_view(),
        name="admin-users"
    ),

    # ======================================================
    # ADMIN - DELETE USER
    # ======================================================

    path(
        "users/<int:pk>/",
        AdminUserDeleteView.as_view(),
        name="admin-user-delete"
    ),
]