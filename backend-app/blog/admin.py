from django.contrib import admin
from .models import CustomUser #CustomUser, Profile, Post, Comment, Category, Tag, Like ,

# admin.site.register(CustomUser)
# admin.site.register(Profile)
# admin.site.register(Post)
# admin.site.register(Comment)
# admin.site.register(Category)
# admin.site.register(Tag)
# admin.site.register(Like)



class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'date_joined')  # Customize the fields shown in the list
    search_fields = ('email', 'username')  # Enable search by email or username

admin.site.register(CustomUser, CustomUserAdmin)


# Register your models here.
