from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView  # ✅ Include JWT refresh view

urlpatterns = [
    path("admin/", admin.site.urls),  
    path("api/", include("blog.urls")),  

    # ✅ Authentication Endpoints
    path("auth/", include("dj_rest_auth.urls")),  
    path("auth/registration/", include("dj_rest_auth.registration.urls")),  
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),  # ✅ Refresh token
]