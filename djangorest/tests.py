import json
from urllib import response
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from userapp.views import UserModelViewSet
from todoapp.views import ProjectModelViewSet
from userapp.models import UserModel

class TestUserViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get':'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_todo(self):
        client = APIClient()
        response = client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TestProjectCreate(APITestCase):
    def test_create_project(self):
        response = self.client.post('/api/projects/', {'name':'test'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_project_list(self):
        user = UserModel.objects.create(username='user', password='password', email='test@test.ru')
        self.client.force_login(user)
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

