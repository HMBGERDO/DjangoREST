from rest_framework.viewsets import ModelViewSet

from .models import TodoModel, ProjectModel
from .serializers import TodoModelSerializer, ProjectModelSerializer

class TodoModelViewSet(ModelViewSet):
    queryset = TodoModel.objects.all()
    serializer_class = TodoModelSerializer

class ProjectModelViewSet(ModelViewSet):
    queryset = ProjectModel.objects.all()
    serializer_class = ProjectModelSerializer