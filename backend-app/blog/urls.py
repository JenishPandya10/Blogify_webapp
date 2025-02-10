from django.urls import path
from dj_rest_auth.views import LoginView, LogoutView
from dj_rest_auth.registration.views import RegisterView
from .views import CreateBlogView  # Ensure this exists

urlpatterns = [
    path("auth/login/", LoginView.as_view(), name="rest_login"),
    path("auth/logout/", LogoutView.as_view(), name="rest_logout"),
    path("auth/registration/", RegisterView.as_view(), name="rest_register"),
    path("blogs/create/", CreateBlogView.as_view(), name="create-blog"),
]
