from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.utils import jwt_get_username_from_payload_handler

from .models import Post
from .serializers import PostSerializer


class PostAPI(APIView):
    authentication_classes = [
        BasicAuthentication
    ]
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request):
        data = request.data
        serializer = PostSerializer(data=data)
        print(serializer)
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class PostDetailAPI(APIView):
    def get(self, request, id):
        try:
            post = Post.objects.get(id=id)
            serializer = PostSerializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"Error": "The post doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, id):
        try:
            post = Post.objects.get(id=id)
            serializer = PostSerializer(instance=post, data=request.data)
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"Error": "The post doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id):
        try:
            post = Post.objects.get(id=id)
            post.delete()
        except:
            return Response({"Error": "The post doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)


class PostLikeAPI(APIView):
    authentication_classes = [
        JSONWebTokenAuthentication
    ]
    def post(self, request):
        post = get_object_or_404(Post, id=request.data['post_id'])
        user = get_object_or_404(User, username=request.user)
        if post.liked_by.filter(username=user.username).exists():
            post.liked_by.remove(user)
            post.likes -= 1
            post.save()
            return Response({"message": "Post was disliked"}, status=status.HTTP_200_OK)
        post.liked_by.add(user)
        post.likes += 1
        post.save()
        return Response({"message": "Post was liked"}, status=status.HTTP_200_OK)


'''
http -f post http://localhost:8000/posts/api/posts/like/ "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6InR5bGVyIiwiZXhwIjoxNTk3NjQyODA0LCJlbWFpbCI6IiIsIm9yaWdfaWF0IjoxNTk3NjM5MjA0fQ.0LZR6VTM4KwMH-5xzXTAd34ljCNaT7LYEQ8G5x6lGWQ" post_id=1
'''