from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView  # ✅ Include JWT refresh view

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView  
from blog.views import login_view, UserRegisterView  # ✅ Import views correctly

urlpatterns = [
    path("admin/", admin.site.urls),  
    path("api/", include("blog.urls")),  

    # ✅ Authentication Endpoints (Corrected)
    path("auth/login/", login_view, name="login"),  
    path("auth/registration/", UserRegisterView.as_view(), name="register"),  
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),  # ✅ Refresh token
]
