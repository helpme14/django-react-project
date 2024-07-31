from django.db import models



class ProjectManager(models.Model):
    name = models.CharField(unique=True,max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name




class Item(models.Model):
    STATUS_CHOICES = [
        ('', 'Select status'),
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    name = models.CharField(max_length=200)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    comments = models.CharField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, blank=True, default='')

    def __str__(self):
        return self.name
