from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import CustomUser, Post, Blog

class CustomUserCreateSerializer(UserCreateSerializer):
    """
    Serializer for user registration with additional fields.
    """
    class Meta(UserCreateSerializer.Meta):  # Explicitly inherit Meta class
        model = CustomUser
        fields = ('id', 'email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}  # Ensure password is write-only

class CustomUserSerializer(UserSerializer):
    """
    Serializer for returning user details.
    """
    class Meta(UserSerializer.Meta):  # Explicitly inherit Meta class
        model = CustomUser
        fields = ('id', 'email', 'username')

class PostSerializer(serializers.ModelSerializer):
    """
    Serializer for blog posts.
    """
    class Meta:
        model = Post
        fields = '__all__'  # Or specify required fields

class BlogSerializer(serializers.ModelSerializer):
    """
    Serializer for blogs.
    """
    class Meta:
        model = Blog
        fields = '__all__'  # Ensure all fields are serialized
