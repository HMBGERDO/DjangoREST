from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework import status
from .models import TodoModel, ProjectModel
from .serializers import TodoModelSerializer, ProjectModelSerializer
from .filters import ProjectFilter

class ProjectModelLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10

class TodoModelLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20

class TodoModelViewSet(ModelViewSet):
    pagination_class = TodoModelLimitOffsetPagination
    queryset = TodoModel.objects.all()
    serializer_class = TodoModelSerializer
    filterset_fields = ['project']

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ProjectModelViewSet(ModelViewSet):
    pagination_class = ProjectModelLimitOffsetPagination
    queryset = ProjectModel.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter
