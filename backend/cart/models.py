# cart/models.py
from django.db import models
from django.conf import settings
from catalog.models import Product  # Assuming you have a Product model

# cart/models.py

class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=255, default=' Cart Name')  # Add a default value

    def __str__(self):
        return f"Cart for {self.user.email}"

    def get_total_price(self):
        return sum(item.get_total_price() for item in self.items.all())

    def is_empty(self):
        return self.items.count() == 0

    def __str__(self):
        return self.name

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    # name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.quantity} of {self.product.name} in cart"

    def get_total_price(self):
        return self.price * self.quantity
