from pydoc import resolve
from typing_extensions import Required
import graphene
from graphene_django import DjangoObjectType
from userapp.models import UserModel
from todoapp.models import TodoModel, ProjectModel


class UserType(DjangoObjectType):
    class Meta:
        model = UserModel
        fields = '__all__'

class TodoType(DjangoObjectType):
    class Meta:
        model = TodoModel
        fields = '__all__'

class ProjectType(DjangoObjectType):
    class Meta:
        model = ProjectModel
        fields = '__all__'

class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    def resolve_all_users(root, info):
        return UserModel.objects.all()

    all_todo = graphene.List(TodoType)
    def resolve_all_todo(root, info):
        return TodoModel.objects.all()

    all_projects = graphene.List(ProjectType)
    def resolve_all_projects(root, info):
        return ProjectModel.objects.all()

    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    def resolve_user_by_id(root, info, id):
        try: 
            return UserModel.objects.get(id=id)
        except UserModel.DoesNotExist:
            return None

    project_data = graphene.Field(ProjectType, id=graphene.Int(required=True))
    def resolve_project_data(root, info, id):
        try:
            return ProjectModel.objects.get(id=id)
        except ProjectModel.DoesNotExist:
            return None

schema = graphene.Schema(query=Query)
