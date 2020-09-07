from django.urls import path
from . import views


app_name = 'posts'
urlpatterns = [
    path('api/', views.PostAPIRoot.as_view(), name='api-root'),
    path('api/posts/', views.PostAPI.as_view(), name='post-list'),
    path('api/posts/<int:id>/', views.PostDetailAPI.as_view(), name='post-detail'),
    path('api/posts/like/', views.PostLikeAPI.as_view(), name='post-like'),
    path('api/posts/generic/', views.PostAPIGeneric.as_view(), name='post-list-generic')
]