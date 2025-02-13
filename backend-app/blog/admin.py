from django.contrib import admin
from .models import Blog, Post, CustomUser  # ✅ Import CustomUser

# ✅ Register CustomUser
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'is_active', 'is_staff')
    search_fields = ('email', 'username')
    list_filter = ('is_active', 'is_staff', 'date_joined')

# ✅ Register Blog model
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'category', 'created_at')
    search_fields = ('title', 'category', 'user__email')  # Use 'user__email' for CustomUser
    list_filter = ('category', 'created_at')

# ✅ Register Post model
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title', 'content')
    list_filter = ('created_at',)
