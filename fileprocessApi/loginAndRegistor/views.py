from distutils.file_util import write_file
from http.client import ResponseNotReady, responses
import json
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import django.contrib.auth.password_validation as validators
from django.core import serializers as serializer_django


from loginAndRegistor.models import FileData, User
from loginAndRegistor.serializers import  FileDataSerializer, UserSerializer

# Create your views here.

@api_view([ 'POST'])
def user_register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)   
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view([ 'POST'])
def user_login(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)   
        if serializer.is_valid():
            try:
                print(serializer.data)
                user = User.objects.get(username=serializer.data.get('username'))
                print(user)
                if serializer.data.get('password') == user.getPassword():
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                     return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def file_data(request):
    if request.method == 'POST':
        read_file = request.FILES['file']    
        data = json.load(read_file)
        for i in data:
            i['username'] = request.data.get("data")
            serializer = FileDataSerializer(data=i) 
            if serializer.is_valid():
                serializer.save()
            else:
                Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=204)         
@api_view(['GET'])
def get_file_data(request):
    if request.method == 'GET':
        dataowner = request.GET["username"]
        user = FileData.objects.filter(username = dataowner)
        jsonObj1 = serializer_django.serialize("json",user)
        return JsonResponse( jsonObj1 , status = status.HTTP_200_OK,  safe=False)
