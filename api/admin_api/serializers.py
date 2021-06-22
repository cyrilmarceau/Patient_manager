from rest_framework import serializers
from core import models


class UserSerializer(serializers.ModelSerializer):
    """Serialize a user profile object"""

    class Meta:
        model = models.User
        fields = ('id', 'email', 'firstname', 'lastname', 'age', 'city', 'address', 'zipcode', 'phone', 'created_at',
                  'updated_at', 'password')
        read_only_fields = ('created_at', 'updated_at')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

    def create(self, validated_data):
        """Create and return a new user"""
        user = models.User.objects.create_user(
            email=validated_data['email'],
            firstname=validated_data['firstname'],
            lastname=validated_data['lastname'],
            password=validated_data['password'],
            age=validated_data['age'],
            city=validated_data['city'],
            address=validated_data['address'],
            zipcode=validated_data['zipcode'],
            phone=validated_data['phone'],
        )

        return user

    def update(self, instance, validated_data):
        """Handle updating user account"""
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)

        return super().update(instance, validated_data)
