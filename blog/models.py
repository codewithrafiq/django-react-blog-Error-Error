from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=150, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    image = models.ImageField(
        upload_to="profile", default="img_avatar.png", blank=True, null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def createuserprofile(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.create(user=instance)


class Post(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='post',  blank=True, null=True)
    date = models.DateField(auto_now_add=True)

    def get_total_likes(slef):
        return Like.objects.filter(post=self).filter(like=True).count()

    def __str__(self):
        return self.title


class Like(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='postlikes')
    like = models.BooleanField(default=False)


class Comment(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    title = models.TextField()
    date = models.DateField(auto_now_add=True)


class Reply(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    title = models.TextField()
    date = models.DateField(auto_now_add=True)
