from django.urls import path
from . import views


app_name = 'posts'
urlpatterns = [
    path('api/posts/', views.PostAPI.as_view(), name='posts'),
    path('api/posts/<int:id>/', views.PostDetailAPI.as_view(), name='post-detail'),
    path('api/posts/like/', views.PostLikeAPI.as_view(), name='post-like')
]