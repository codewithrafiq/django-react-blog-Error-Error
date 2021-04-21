from django.contrib import admin
from .models import Profile, Post, Like, Comment, Reply


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'id']


@admin.register(Post)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['title', 'id', 'profile']


@admin.register(Like)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['profile', 'post', 'like', 'id']


@admin.register(Comment)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['profile', 'post', 'id']


@admin.register(Reply)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['profile', 'title', 'id']
