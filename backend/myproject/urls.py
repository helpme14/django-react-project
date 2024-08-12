# project/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authentication/', include('authentication.urls')),
    path('cart/', include('cart.urls')),  # Include the cart app URLs here
    path('catalog/', include('catalog.urls')),
]
