import json
from django import forms
from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=1000)
    password = models.CharField(max_length=1000)
    fulladdress  = models.CharField(max_length=10000)

    def __str__(self) -> str:
        return self.username
    def getPassword(self) -> str :
        return self.password

class FileData(models.Model):
    id = models.IntegerField(primary_key=True)
    username =  models.CharField(max_length=1000, default="")
    userId = models.IntegerField()
    title = models.CharField(max_length=1000,default="")
    body = models.CharField(max_length=1000, default="")

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)
    
    def __str__(self)-> str:
        return "{" + "id" + " : " + str(self.id) + ", userId : " + str(self.userId) + " , title : " + self.title + " , body : " + self.body +" }"
        


