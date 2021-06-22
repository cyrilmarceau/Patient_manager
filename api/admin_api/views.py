from django.shortcuts import render
from rest_framework import viewsets

from admin_api import serializers
from core import models

class UserViewSet(viewsets.ModelViewSet):
    """Handle creating and updating profiles"""
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()
