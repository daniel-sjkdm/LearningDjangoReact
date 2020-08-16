from django.urls import path
from . import views


app_name='accounts'
urlpatterns = [
    path('api/accounts/', views.UserAPI.as_view(), name='accounts'),
    path('api/accounts/<str:username>/', views.UserDetailAPI.as_view(), name='accounts-detail'),
    path('register/', views.UserRegisterAPI.as_view(), name='accounts-register'),
    path('login/', views.UserLoginAPI.as_view(), name='accounts-login')
]