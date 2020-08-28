from .models import Post
from markdown import markdown
from rest_framework import serializers
from accounts.serializers import UserSerializer
from django.contrib.auth.models import User


# TODO:
# - [X] Make the author an optional field
# - [X] Use serializer relations to improve the API (SlugRelatedField)
# - [X] Convert content field's text (markdown) as html


class PostSerializer(serializers.ModelSerializer):
    word_count = serializers.IntegerField(read_only=False, required=False, default=0)
    author = serializers.SlugRelatedField(slug_field='username', read_only=True)
    liked_by = serializers.SlugRelatedField(slug_field='username', many=True, read_only=True)
    created = serializers.DateTimeField(format="%d/%m/%y_%H:%M:%S")
    # This is another way to do the same, but not convenient since it fetchs all
    # the serializer declared fields
    # author = UserSerializer()
    
    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'author',
            'content',
            'likes',
            'liked_by',
            'word_count',
            'created',
        ]
        sorted = ['created']
        # When there isn't a relational field declared, you can
        # specify the depth of the model's fields to be  1 or more
        # depth = 1

        # Read only fields must be included here or also can be 
        # explicitly coded in the field delaration
        read_only_fields = [ 
            
        ]

    def create(self, validated_data):
        content = validated_data['content']
        content = markdown(content)
        print(content)
        word_count = validated_data.pop('word_count', None)
        print("Serializer word count: ", word_count)
        print(validated_data)
        return Post.objects.create(
            title = validated_data['title'],
            author = validated_data['author'],
            content = content
        )

    def validate_content(self, value):
        if len(value) > 200:
            raise serializers.ValidationError("Length of post is not valid, must be less than 200 characters")
        return value