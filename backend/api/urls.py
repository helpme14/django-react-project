from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ProjectManagerViewSet, ItemViewSet


router = DefaultRouter()
router.register(r'project-managers', ProjectManagerViewSet)
router.register(r'items', ItemViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
   
]