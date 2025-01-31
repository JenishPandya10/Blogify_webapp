from dj_rest_auth.views import LoginView, LogoutView
from dj_rest_auth.registration.views import RegisterView
from django.urls import path, include

urlpatterns = [
    path('auth/login/', LoginView.as_view(), name='rest_login'),
    path('auth/logout/', LogoutView.as_view(), name='rest_logout'),
    path('auth/registration/', RegisterView.as_view(), name='rest_register'),
    path('auth/social/', include('allauth.urls')),  # This includes the Google login route
]
