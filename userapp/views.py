from rest_framework import generics, mixins
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .models import UserModel
from .serializers import UserModelSerializer, UserModelSerializer_v1
from django.http.response import Http404

class UserModelAPIView(generics.CreateAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = UserModel.objects.all()

    def get(self, request, **kwargs):
        if kwargs.get('pk'):
            return self.retrieve(request)
        else:
            return self.list(request)

    def get_serializer_class(self):
        if self.request.version == 'v1':
            return UserModelSerializer_v1
        elif self.request.version == 'v0':
            return UserModelSerializer
        else:
            raise Http404
    