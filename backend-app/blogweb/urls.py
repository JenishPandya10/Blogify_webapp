from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("blog.urls")),  # Blog app URLs

    # Djoser authentication
    # path("auth/", include("djoser.urls")),
    # path("auth/", include("djoser.urls.jwt")),  # JWT authentication
    path("auth/social/", include("allauth.urls")),  # ✅ Use django-allauth instead
]
