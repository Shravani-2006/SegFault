from django.urls import path
from . import views

urlpatterns = [
    path('round-trip-translate/', views.round_trip_translate, name='round_trip_translate'),
]
    
