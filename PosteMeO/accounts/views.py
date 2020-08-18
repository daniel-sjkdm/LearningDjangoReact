from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import BasicAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import UserSerializer, RegisterSerializer
from rest_framework_jwt.settings import api_settings


# TODO: 
# - [x] Add JWT authentication


def getJWTCreds(user):
    payload = api_settings.JWT_PAYLOAD_HANDLER(user)
    return api_settings.JWT_ENCODE_HANDLER(payload)



class UserAPI(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserDetailAPI(APIView):
    authentication_classes = [
        JSONWebTokenAuthentication
    ]
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    def delete(self, request, username):
        user = get_object_or_404(User, username=username)
        user.delete()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UserRegisterAPI(APIView):
    authentication_classes = [
        JSONWebTokenAuthentication
    ]
    # permission_classes = [
    #     IsAdminUser
    # ]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "user": UserSerializer(user).data,
                "token": getJWTCreds(user)
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserLoginAPI(APIView):
    authentication_classes = []
    permission_classes = []
    def post(self, request):
        username=request.data.get('username')
        password=request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            return Response({
                "user": UserSerializer(user).data,
                "token": getJWTCreds(user)
            }, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)