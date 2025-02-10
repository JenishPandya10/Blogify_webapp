from dj_rest_auth.views import LoginView, LogoutView
from dj_rest_auth.registration.views import RegisterView
from django.urls import path, include
from .views import CreateBlogView  # Ensure this exists in views.py

urlpatterns = [
    path('auth/login/', LoginView.as_view(), name='rest_login'),
    path('auth/logout/', LogoutView.as_view(), name='rest_logout'),
    path('auth/registration/', RegisterView.as_view(), name='rest_register'),
    path('auth/social/', include('allauth.urls')),  # Ensure social auth is configured in settings.py
    path('blogs/create/', CreateBlogView.as_view(), name='create-blog'),
]
