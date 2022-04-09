from django_filters import rest_framework as filters
from .models import ProjectModel

class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')
    
    class Meta:
        model = ProjectModel
        fields = ['name']
