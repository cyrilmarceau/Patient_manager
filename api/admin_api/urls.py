from django.urls import path, include
from rest_framework.routers import DefaultRouter
from admin_api import views

router = DefaultRouter()
router.register('users', views.UserViewSet),

urlpatterns = [
    path('', include(router.urls)),
]