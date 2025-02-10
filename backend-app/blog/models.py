from django.db import models
from django.contrib.auth.models import User  # Use Django's default User model

class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Blog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link blog to user
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title



# from django.contrib.auth.models import AbstractUser
# from django.db import models
# from django.conf import settings

# # Custom user model extending AbstractUser
# class CustomUser(AbstractUser):
#     email = models.EmailField(unique=True)

#     def __str__(self):
#         return self.username

# # Profile model linked to the custom user model
# class Profile(models.Model):
#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     bio = models.TextField(blank=True)
#     profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.user.username 

#     class Meta:
#         ordering = ['-created_at']  # Newest posts first

#     def __str__(self):
#         return self.title

# # Comment model linked to custom user and post models
# class Comment(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
#     content = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Comment by {self.user.username} on {self.post.title}"

# # Category model for posts
# class Category(models.Model):
#     name = models.CharField(max_length=100, unique=True)

#     def __str__(self):
#         return self.name

# # Tag model for posts
# class Tag(models.Model):
#     name = models.CharField(max_length=50, unique=True)

#     def __str__(self):
#         return self.name

# # Like model to track likes for posts
# class Like(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     post = models.ForeignKey(Post, related_name='likes', on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         unique_together = ('user', 'post')  # Prevent duplicate likes

#     def __str__(self):
#         return f"{self.user.username} liked {self.post.title}"


# Create your models here.