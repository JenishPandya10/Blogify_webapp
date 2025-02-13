from rest_framework import serializers
from django.contrib.auth import get_user_model  # ✅ Import Custom User Model
from .models import Blog, Post

User = get_user_model()  # ✅ Use the Custom User Model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # ✅ Reference the Custom User Model
        fields = ['id', 'username', 'email']

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
