from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Cart, CartItem
from catalog.models import Product
from .serializers import CartSerializer, CartItemSerializer
from django.core.exceptions import ObjectDoesNotExist

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Cart.objects.filter(user=user)

    @action(detail=False, methods=['post'], url_path='add-item')
    def add_item(self, request):
        try:
            product_id = request.data.get('product_id')
            quantity = request.data.get('quantity', 1)

            if not product_id:
                return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)

            product = Product.objects.get(id=product_id)

            # Get or create the cart for the current user
            cart, created = Cart.objects.get_or_create(
                user=request.user, 
                defaults={'name': f"{request.user.username}'s cart"}
            )

            # Get or create the cart item for the product
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart, 
                product=product,
                defaults={'price': product.price, 'quantity': 0}  # Set initial price and quantity
            )

            # Update quantity and save
            cart_item.quantity += int(quantity)
            cart_item.price = product.price  # Ensure the price is updated if necessary
              # Remove item if quantity is zero
            if cart_item.quantity <= 0:
                cart_item.delete()
                return Response({'message': 'Item removed from cart'}, status=status.HTTP_200_OK)
            
            cart_item.save()

            # Serialize and return the updated cart item
            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({'error': 'Product or Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Log the full exception for debugging purposes
            print(str(e))
            return Response({'error': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, *args, **kwargs):
        cart = self.get_queryset().first()
        if not cart:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(cart)
        return Response(serializer.data)
