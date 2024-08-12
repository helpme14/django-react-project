from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save


from django.conf import settings
from django.core.validators import MinValueValidator
from decimal import Decimal
from catalog.models import Product 

class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
    
class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)

    full_name=models.CharField(max_length=300)
    bio=models.CharField(max_length=300)
    image = models.ImageField(default="default.jpg", upload_to="user_images")
    verified = models.BooleanField(default = False)

    def __str__(self):
        return self.full_name


def create_user_profile(sender,instance,created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender,instance,**kwargs):
    instance.profile.save()

post_save.connect(create_user_profile,sender=User)
post_save.connect(save_user_profile,sender=User)


# class Cart(models.Model):
#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Cart for {self.user.email}"

# class CartItem(models.Model):
#     cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField(default=1)
#     price = models.DecimalField(max_digits=10, decimal_places=2)

#     def __str__(self):
#         return f"{self.quantity} of {self.product.name} in cart"

#     def get_total_price(self):
#         return self.price * self.quantity