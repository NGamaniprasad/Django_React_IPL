# from django.shortcuts import render
#
# # Create your views here.
# from rest_framework import filters, viewsets
# from rest_framework.permissions import IsAuthenticated
#
# from .models import Team
# from .permissions import IsAdminOrReadOnly
# from .serializers import TeamSerializer
#
#
# class TeamViewSet(viewsets.ModelViewSet):
#
#     serializer_class = TeamSerializer
#     permission_classes = [
#         IsAuthenticated,
#         IsAdminOrReadOnly,
#     ]
#
#     filter_backends = [
#         filters.SearchFilter,
#         filters.OrderingFilter,
#     ]
#
#     search_fields = [
#         "name",
#         "short_name",
#         "city",
#         "captain",
#         "coach",
#     ]
#
#     ordering_fields = [
#         "name",
#         "short_name",
#         "city",
#         "founded_year",
#     ]
#
#     ordering = [
#         "name",
#     ]
#
#     def get_queryset(self):
#         return Team.objects.prefetch_related(
#             "players"
#         ).all()

from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from accounts.permissions import IsAdminUserRole

from .models import Team
from .serializers import TeamSerializer


class TeamViewSet(ModelViewSet):

    queryset = Team.objects.all()

    serializer_class = TeamSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_permissions(self):

        if self.request.method in [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
        ]:
            return [
                IsAdminUserRole()
            ]

        return [
            IsAuthenticated()
        ]