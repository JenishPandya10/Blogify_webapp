from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import get_user_model, authenticate
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from google.auth.transport import requests
from google.oauth2 import id_token
from django.contrib.auth.hashers import make_password, check_password
from .serializers import BlogSerializer
from .models import Blog, CustomUser

User = get_user_model()

@api_view(["POST"])
def signup_view(request):
    data = request.data
    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirm_password")

    if not email or not password or not confirm_password:
        return Response({"error": "All fields are required"}, status=400)

    if password != confirm_password:
        return Response({"error": "Passwords do not match"}, status=400)

    if CustomUser.objects.filter(email=email).exists():
        return Response({"error": "User already exists"}, status=400)

    try:
        # ✅ Use `create_user()` to handle password hashing
        user = CustomUser.objects.create_user(email=email, password=password)
        return Response({"message": "User registered successfully"}, status=201)

    except Exception as e:
        return Response({"error": "Something went wrong", "details": str(e)}, status=500)



# ✅ Login View (Fixed)
@api_view(["POST"])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=400)

    # ✅ Check password manually
    if not check_password(password, user.password):
        return Response({"error": "Invalid credentials"}, status=400)

    # ✅ Generate JWT tokens
    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        },
        status=200,
    )


# ✅ Google Login View (Fixed)
@api_view(["POST"])
def google_login(request):
    token = request.data.get("credential")  # Get Google token from frontend

    if not token:
        return Response({"error": "Token is required"}, status=400)

    try:
        client_id = "846204416661-ojdh7p7938c8qo7oep54p3tojc5ltld7.apps.googleusercontent.com"
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), client_id)

        email = idinfo.get("email")
        name = idinfo.get("name")

        user, created = User.objects.get_or_create(email=email, defaults={"username": name})

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "email": email,
                "username": user.username,
            }
        )

    except Exception as e:
        return Response({"error": "Invalid Google token", "details": str(e)}, status=400)


# ✅ Create Blog View (Fixed)
class CreateBlogView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        title = request.data.get("title")
        content = request.data.get("content")
        category = request.data.get("category")

        if not title or not content or not category:
            return Response({"error": "All fields are required"}, status=400)

        blog = Blog.objects.create(user=user, title=title, content=content, category=category)
        return Response({"message": "Blog created successfully!", "blog": BlogSerializer(blog).data}, status=201)
