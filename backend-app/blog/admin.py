from django.contrib import admin
from .models import Blog, CustomUser  # ✅ Removed Post import

# ✅ Register CustomUser
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'is_active', 'is_staff')
    search_fields = ('email', 'username')
    list_filter = ('is_active', 'is_staff', 'date_joined')

# ✅ Register Blog model
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'created_at')
    search_fields = ('title', 'user__email')  
