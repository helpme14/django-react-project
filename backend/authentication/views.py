from django.shortcuts import render

# Create your views here.
from authentication.serializer import UserSerializer,MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from authentication.models import User


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset= User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class  = RegisterSerializer



@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/authentication/token/',
        '/authentication/register/',
        '/authentication/token/refresh/'
    ]
    return Response(routes)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congrats {request.user}, your API just responded to GET request"
        return Response({'response':data}, status = status.HTTP_200_OK)
    
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congrats your API just responded to POST request with text:{text}'
        return Response({'response':data},status = status.HTTP_200_OK)