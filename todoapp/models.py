from django.db import models
from userapp.models import UserModel

class ProjectModel(models.Model):
    name = models.CharField(max_length=100)
    repo = models.URLField(blank=True)
    users = models.ManyToManyField(UserModel, blank=True)

class TodoModel(models.Model):
    project = models.ForeignKey(ProjectModel, on_delete=models.CASCADE)
    author = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    text = models.TextField(max_length=1500)
