from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),  # Django Admin Panel
    path("api/", include("blog.urls")),  # Include all routes from blog.urls
]
