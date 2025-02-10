from django.contrib import admin
from .models import Blog, Post  # Import only existing models

# Register Blog model
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'category', 'created_at')  # Fields to display
    search_fields = ('title', 'category', 'user__username')  # Enable search
    list_filter = ('category', 'created_at')  # Add filters

# Register Post model
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title', 'content')
    list_filter = ('created_at',)

# Register models in Django admin
admin.site.register(Blog, BlogAdmin)
admin.site.register(Post, PostAdmin)
