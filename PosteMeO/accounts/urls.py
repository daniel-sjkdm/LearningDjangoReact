from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token


app_name='accounts'
urlpatterns = [
    path('api/accounts/', views.UserAPI.as_view(), name='accounts'),
    path('api/accounts/<str:username>/', views.UserDetailAPI.as_view(), name='accounts-detail'),
    path('register/', views.UserRegisterAPI.as_view(), name='accounts-register'),
    path('login/', views.UserLoginAPI.as_view(), name='accounts-login'),
    path('api/jwt_token/', obtain_jwt_token, name='jwt'),
    path('api/jwt_token/refresh/', refresh_jwt_token, name='jwt-refresh'),
    path('api/jwt_token/verify/', verify_jwt_token, name='jwt-verify'),
]