from django.db import models
from django.contrib.auth.models import User


class PostLike(models.Model):
    post = models.ForeignKey("Post", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Post(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    content = models.CharField(max_length=200)
    likes = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    liked_by = models.ManyToManyField(User, related_name='like_user', blank=True, through=PostLike)

    def __str__(self):
        return self.title
