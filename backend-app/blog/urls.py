from django.urls import path
from dj_rest_auth.views import LoginView, LogoutView
from dj_rest_auth.registration.views import RegisterView
# from rest_framework_simplejwt.views import TokenRefreshView
# from .views import CreateBlogView  # Ensure this exists

# urlpatterns = [
#     # Authentication Endpoints
#     path("auth/login/", LoginView.as_view(), name="rest_login"),  # ✅ Login route
#     path("auth/logout/", LogoutView.as_view(), name="rest_logout"),
#     path("auth/registration/", RegisterView.as_view(), name="rest_register"),
#     path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

   
#     path("blogs/create/", CreateBlogView.as_view(), name="create-blog"),
# ]

from django.urls import path
from .views import CreateBlogView

urlpatterns = [
    path("blogs/create/", CreateBlogView.as_view(), name="create-blog"),  # ✅ Create Blog API
]