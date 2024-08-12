# catalog/models.py
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)  # Optional: Track available stock
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)  # Optional: Product image

    def __str__(self):
        return self.name
