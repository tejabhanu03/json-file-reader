from dataclasses import field
from re import I
from django import forms
from django.forms import ValidationError
from rest_framework import serializers
from .models import  User, FileData

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields  = (
            'username', 'password'
        )

class FileDataSerializer(serializers.ModelSerializer):        
    class Meta:
        model = FileData
        fields =  (
            'username', 'userId', 'id', 'title', 'body'
        )