

##
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers

from .models import UserProfile


User = get_user_model()


# ==========================================================
# REGISTER SERIALIZER
# ==========================================================

class RegisterSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = User

        fields = [
            "first_name",
            "username",
            "email",
            "password",
            "confirm_password",
        ]

        extra_kwargs = {
            "password": {
                "write_only": True
            },
            "email": {
                "required": True
            },
        }

    def validate_username(self, value):

        if User.objects.filter(
            username__iexact=value
        ).exists():

            raise serializers.ValidationError(
                "This username is already taken."
            )

        return value

    def validate_email(self, value):

        if User.objects.filter(
            email__iexact=value
        ).exists():

            raise serializers.ValidationError(
                "This email is already registered."
            )

        return value

    def validate_password(self, value):

        validate_password(value)

        return value

    def validate(self, attrs):

        if (
            attrs["password"]
            != attrs["confirm_password"]
        ):

            raise serializers.ValidationError({
                "confirm_password":
                    "Passwords do not match."
            })

        return attrs

    def create(self, validated_data):

        validated_data.pop(
            "confirm_password"
        )

        password = validated_data.pop(
            "password"
        )

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        return user


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