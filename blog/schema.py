import graphene
from graphql_jwt.decorators import login_required
from .models import *
from graphene_django import DjangoObjectType
from django.contrib.auth.models import User
from graphene_file_upload.scalars import Upload


class ProfileType(DjangoObjectType):
    class Meta:
        model = Profile

    def resolve_image(self, info):
        avatar_url = info.context.build_absolute_uri(f"/media/{self.image}")
        return avatar_url


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')


class LikeType(DjangoObjectType):
    class Meta:
        model = Like


class CommentType(DjangoObjectType):
    class Meta:
        model = Comment


class PostType(DjangoObjectType):
    tlikes = graphene.Int()
    mlikes = graphene.Boolean()
    comments = graphene.List(CommentType)

    class Meta:
        model = Post
        # fields = ('id', 'title', "get_total_likes")

    def resolve_tlikes(self, info):
        return Like.objects.filter(post=self).filter(like=True).count()

    def resolve_mlikes(self, info):
        like_obj = Like.objects.filter(
            post=self).filter(profile=info.context.user.profile).first()
        if like_obj:
            return like_obj.like
        else:
            return False

    def resolve_image(self, info):
        avatar_url = info.context.build_absolute_uri(f"/media/{self.image}")
        return avatar_url

    def resolve_comments(self, info):
        return Comment.objects.filter(post=self).order_by('-id')


class Query(graphene.ObjectType):
    posts = graphene.List(PostType, pk=graphene.Int())
    likes = graphene.List(LikeType)
    profile = graphene.Field(ProfileType)

    @login_required
    def resolve_posts(self, info, pk=None):
        if pk:
            return Post.objects.filter(id=pk)
        return Post.objects.all().order_by("-id")

    @login_required
    def resolve_likes(self, info):
        return Like.objects.all()

    @login_required
    def resolve_profile(self, info):
        return Profile.objects.get(user=info.context.user)


class AddPost(graphene.Mutation):
    post = graphene.Field(PostType)

    class Arguments:
        title = graphene.String(required=True)
        content = graphene.String(required=True)
        image = Upload()

    # @classmethod
    @login_required
    def mutate(self, info, title, content, image):
        print("title", title)
        print("content", content)
        print("image", image)
        user = info.context.user
        post = Post(title=title, content=content,
                    image=image, profile=user.profile)
        post.save()
        return AddPost(post=post)


class Mutation(graphene.ObjectType):
    add_post = AddPost.Field()
