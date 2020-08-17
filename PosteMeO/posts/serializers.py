from .models import Post
from rest_framework import serializers


# TODO:
# - [ ] Make the author an optional field

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'author',
            'content',
            'likes',
            'created'
        ]