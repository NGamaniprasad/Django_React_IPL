# from django.contrib.auth import get_user_model
# from rest_framework import serializers
#
#
# User = get_user_model()
#
#
# class UserRegistrationSerializer(
#     serializers.ModelSerializer
# ):
#
#     password = serializers.CharField(
#         write_only=True,
#         min_length=8
#     )
#
#     confirm_password = serializers.CharField(
#         write_only=True
#     )
#
#     class Meta:
#         model = User
#
#         fields = [
#             "id",
#             "username",
#             "email",
#             "first_name",
#             "password",
#             "confirm_password",
#         ]
#
#         read_only_fields = [
#             "id",
#         ]
#
#     def validate(self, data):
#
#         if data["password"] != data["confirm_password"]:
#             raise serializers.ValidationError(
#                 {
#                     "confirm_password":
#                     "Passwords do not match."
#                 }
#             )
#
#         return data
#
#     def validate_email(self, value):
#
#         if User.objects.filter(
#             email=value
#         ).exists():
#
#             raise serializers.ValidationError(
#                 "Email is already registered."
#             )
#
#         return value
#
#     def create(self, validated_data):
#
#         validated_data.pop(
#             "confirm_password"
#         )
#
#         password = validated_data.pop(
#             "password"
#         )
#
#         user = User.objects.create_user(
#             password=password,
#             **validated_data
#         )
#
#         return user
##working

# from django.contrib.auth import get_user_model
# from rest_framework import serializers
#
#
# User = get_user_model()
#
#
# class UserRegistrationSerializer(serializers.ModelSerializer):
#
#     password = serializers.CharField(
#         write_only=True,
#         min_length=8
#     )
#
#     confirm_password = serializers.CharField(
#         write_only=True
#     )
#
#     class Meta:
#         model = User
#
#         fields = [
#             "id",
#             "username",
#             "email",
#             "first_name",
#             "password",
#             "confirm_password",
#         ]
#
#         read_only_fields = [
#             "id",
#         ]
#
#     def validate(self, data):
#
#         if data["password"] != data["confirm_password"]:
#             raise serializers.ValidationError(
#                 {
#                     "confirm_password":
#                     "Passwords do not match."
#                 }
#             )
#
#         return data
#
#     def validate_email(self, value):
#
#         if User.objects.filter(
#             email=value
#         ).exists():
#
#             raise serializers.ValidationError(
#                 "Email is already registered."
#             )
#
#         return value
#
#     def create(self, validated_data):
#
#         validated_data.pop(
#             "confirm_password"
#         )
#
#         password = validated_data.pop(
#             "password"
#         )
#
#         user = User.objects.create_user(
#             password=password,
#             **validated_data
#         )
#
#         return user
#
#
# # ==========================================================
# # ADMIN USER MANAGEMENT SERIALIZER
# # ==========================================================
#
# class AdminUserSerializer(serializers.ModelSerializer):
#
#     full_name = serializers.SerializerMethodField()
#
#     role = serializers.SerializerMethodField()
#
#     profile_active = serializers.SerializerMethodField()
#
#     created_at = serializers.SerializerMethodField()
#
#     class Meta:
#
#         model = User
#
#         fields = [
#             "id",
#             "username",
#             "email",
#             "first_name",
#             "last_name",
#             "full_name",
#             "role",
#             "is_active",
#             "profile_active",
#             "is_staff",
#             "is_superuser",
#             "created_at",
#         ]
#
#         read_only_fields = [
#             "id",
#             "username",
#             "role",
#             "full_name",
#             "profile_active",
#             "is_staff",
#             "is_superuser",
#             "created_at",
#         ]
#
#     def get_full_name(self, obj):
#
#         if hasattr(obj, "profile"):
#             return obj.profile.full_name
#
#         return (
#             obj.get_full_name()
#             or obj.username
#         )
#
#     def get_role(self, obj):
#
#         if obj.is_staff:
#             return "ADMIN"
#
#         return "USER"
#
#     def get_profile_active(self, obj):
#
#         if hasattr(obj, "profile"):
#             return obj.profile.is_active
#
#         return obj.is_active
#
#     def get_created_at(self, obj):
#
#         return obj.date_joined

####
# from django.contrib.auth import get_user_model
# from django.contrib.auth.password_validation import validate_password
#
# from rest_framework import serializers
#
#
# User = get_user_model()
#
#
# class ProfileSerializer(serializers.ModelSerializer):
#
#     full_name = serializers.SerializerMethodField(read_only=True)
#
#     class Meta:
#         model = User
#
#         fields = [
#             "id",
#             "username",
#             "email",
#             "first_name",
#             "last_name",
#             "full_name",
#             "is_staff",
#             "is_superuser",
#             "is_active",
#             "date_joined",
#         ]
#
#         read_only_fields = [
#             "id",
#             "full_name",
#             "is_staff",
#             "is_superuser",
#             "is_active",
#             "date_joined",
#         ]
#
#     def get_full_name(self, obj):
#         return obj.get_full_name()
#
#     def validate_username(self, value):
#
#         user = self.context["request"].user
#
#         if User.objects.exclude(
#             id=user.id
#         ).filter(
#             username__iexact=value
#         ).exists():
#
#             raise serializers.ValidationError(
#                 "This username is already taken."
#             )
#
#         return value
#
#     def validate_email(self, value):
#
#         user = self.context["request"].user
#
#         if User.objects.exclude(
#             id=user.id
#         ).filter(
#             email__iexact=value
#         ).exists():
#
#             raise serializers.ValidationError(
#                 "This email is already registered."
#             )
#
#         return value
#
#
# class ChangePasswordSerializer(serializers.Serializer):
#
#     current_password = serializers.CharField(
#         write_only=True
#     )
#
#     new_password = serializers.CharField(
#         write_only=True
#     )
#
#     confirm_password = serializers.CharField(
#         write_only=True
#     )
#
#     def validate_current_password(self, value):
#
#         user = self.context["request"].user
#
#         if not user.check_password(value):
#
#             raise serializers.ValidationError(
#                 "Current password is incorrect."
#             )
#
#         return value
#
#     def validate(self, attrs):
#
#         if (
#             attrs["new_password"]
#             != attrs["confirm_password"]
#         ):
#
#             raise serializers.ValidationError({
#                 "confirm_password":
#                     "New passwords do not match."
#             })
#
#         validate_password(
#             attrs["new_password"],
#             self.context["request"].user
#         )
#
#         return attrs


#####


from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers

from .models import UserProfile


User = get_user_model()


# ==========================================================
# USER PROFILE SERIALIZER
# ==========================================================

class ProfileSerializer(serializers.ModelSerializer):

    full_name = serializers.SerializerMethodField(
        read_only=True
    )

    role = serializers.SerializerMethodField(
        read_only=True
    )

    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "role",
            "is_staff",
            "is_superuser",
            "is_active",
            "date_joined",
        ]

        read_only_fields = [
            "id",
            "full_name",
            "role",
            "is_staff",
            "is_superuser",
            "is_active",
            "date_joined",
        ]

    def get_full_name(self, obj):

        return obj.get_full_name()

    def get_role(self, obj):

        if obj.is_staff or obj.is_superuser:
            return "ADMIN"

        return "USER"

    def validate_username(self, value):

        user = self.context["request"].user

        if User.objects.exclude(
            id=user.id
        ).filter(
            username__iexact=value
        ).exists():

            raise serializers.ValidationError(
                "This username is already taken."
            )

        return value

    def validate_email(self, value):

        user = self.context["request"].user

        if User.objects.exclude(
            id=user.id
        ).filter(
            email__iexact=value
        ).exists():

            raise serializers.ValidationError(
                "This email is already registered."
            )

        return value


# ==========================================================
# ADMIN USERS SERIALIZER
# ==========================================================

class AdminUserSerializer(serializers.ModelSerializer):

    full_name = serializers.SerializerMethodField(
        read_only=True
    )

    role = serializers.SerializerMethodField(
        read_only=True
    )

    created_at = serializers.DateTimeField(
        source="date_joined",
        read_only=True
    )

    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "role",
            "is_staff",
            "is_superuser",
            "is_active",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "full_name",
            "role",
            "is_staff",
            "is_superuser",
            "is_active",
            "created_at",
        ]

    def get_full_name(self, obj):

        return obj.get_full_name()

    def get_role(self, obj):

        if obj.is_staff or obj.is_superuser:
            return "ADMIN"

        return "USER"


# ==========================================================
# CHANGE PASSWORD SERIALIZER
# ==========================================================

class ChangePasswordSerializer(serializers.Serializer):

    current_password = serializers.CharField(
        write_only=True
    )

    new_password = serializers.CharField(
        write_only=True
    )

    confirm_password = serializers.CharField(
        write_only=True
    )

    def validate_current_password(self, value):

        user = self.context["request"].user

        if not user.check_password(value):

            raise serializers.ValidationError(
                "Current password is incorrect."
            )

        return value

    def validate(self, attrs):

        if (
            attrs["new_password"]
            != attrs["confirm_password"]
        ):

            raise serializers.ValidationError({
                "confirm_password":
                    "New passwords do not match."
            })

        validate_password(
            attrs["new_password"],
            self.context["request"].user
        )

        return attrs