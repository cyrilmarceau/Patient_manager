from django.shortcuts import render
from rest_framework import viewsets

from django_filters import rest_framework as filters

from rest_framework import filters as drf_filters

from admin_api import serializers
from admin_api import filters as api_filters

from core import models


class UserViewSet(viewsets.ModelViewSet):
    """Handle creating and updating profiles"""
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()
    filter_backends = (filters.DjangoFilterBackend, drf_filters.SearchFilter, drf_filters.OrderingFilter)
    filterset_class = api_filters.UsersFilter
    ordering_fields = ['firstname', 'lastname', ]
    ordering = ['firstname', 'lastname', ]
