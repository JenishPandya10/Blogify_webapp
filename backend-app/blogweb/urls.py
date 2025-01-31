from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('blog.urls')),  # Include blog app's URLs
    path('auth/', include('djoser.urls')),  # Djoser for authentication
    path('auth/', include('djoser.urls.jwt')),  # JWT authentication
    path('auth/', include('djoser.social.urls')),  # Google OAuth
]
