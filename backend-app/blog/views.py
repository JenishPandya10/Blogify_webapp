from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import get_user_model, authenticate
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from google.auth.transport import requests
from google.oauth2 import id_token
from .serializers import BlogSerializer
from .models import Blog

User = get_user_model()

@api_view(["POST"])
def signup_view(request):
    email = request.data.get("email")
    username = request.data.get("username")
    password = request.data.get("password")

    if not email or not username or not password:
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(email=email, username=username, password=password)
    return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)


# ✅ User Login View (Fixed)
@api_view(["POST"])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=400)

    # ✅ Get user by email (because Django default authentication uses username)
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=400)

    # ✅ Authenticate using username
    user = authenticate(username=user.username, password=password)

    if user:
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=200,
        )

    return Response({"error": "Invalid credentials"}, status=400)


# ✅ Google Login View (Fixed)
@api_view(["POST"])
def google_login(request):
    token = request.data.get("credential")  # Get Google token from frontend

    if not token:
        return Response({"error": "Token is required"}, status=400)

    try:
        # ✅ Replace with your actual Google Client ID
        client_id = "846204416661-ojdh7p7938c8qo7oep54p3tojc5ltld7.apps.googleusercontent.com"
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), client_id)

        email = idinfo.get("email")
        name = idinfo.get("name")

        # ✅ Get or create user
        user, created = User.objects.get_or_create(email=email, defaults={"username": name})

        # ✅ Generate JWT token
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
