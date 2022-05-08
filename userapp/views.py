from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from .models import UserModel
from .serializers import UserModelSerializer

class UserModelViewSet(viewsets.ViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = UserModel.objects.all()

    def list(self, request):
        users = UserModel.objects.all()
        serializer = UserModelSerializer(users, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = get_object_or_404(UserModel, pk=pk)
        serializer = UserModelSerializer(user)
        return Response(serializer.data)
    