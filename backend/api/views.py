

# # from rest_framework.response import Response
# # from rest_framework.decorators import api_view
# # from base.models import Item, ProjectManager
# # from .serializers import ItemSerializer,ProjectManagerSerializer

# from rest_framework import viewsets
# from base.models import ProjectManager, Item
# from .serializers import ProjectManagerSerializer, ItemSerializer


# # @api_view(['GET'])
# # def getData(request):
# #     items = Item.objects.all()
# #     serializer = ItemSerializer(items,many=True)
# #     return Response(serializer.data)

# # @api_view(['POST'])
# # def addItem(request):
# #     serializer = ItemSerializer(data=request.data)
# #     if serializer.is_valid():
# #         serializer.save()
# #     return Response(serializer.data)

# class ProjectManagerViewSet(viewsets.ModelViewSet):
#     queryset = ProjectManager.objects.all()
#     serializer_class = ProjectManagerSerializer

# class ItemViewSet(viewsets.ModelViewSet):
#     queryset = Item.objects.all()
#     serializer_class = ItemSerializer