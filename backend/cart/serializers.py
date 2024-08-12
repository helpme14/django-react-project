# cart/serializers.py

from rest_framework import serializers
from .models import Cart, CartItem
from catalog.models import Product  # Import the Product model

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)  # Add the product name

    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'product_name', 'quantity', 'price']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)  # Ensure that cart items are read-only

    class Meta:
        model = Cart
        fields = ['user', 'items']
