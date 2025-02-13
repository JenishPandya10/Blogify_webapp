from django.urls import path
from .views import signup_view, login_view, google_login, CreateBlogView

urlpatterns = [
    path("auth/signup/", signup_view, name="signup"),  # User Registration
    path("auth/login/", login_view, name="login"),  # User Login
    path("auth/google-login/", google_login, name="google-login"),  # Google Login
    path("blog/create/", CreateBlogView.as_view(), name="create-blog"),  # Create Blog
]
