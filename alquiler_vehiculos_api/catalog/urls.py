from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import VehicleViewSet, RentalViewSet

router = DefaultRouter()
router.register(r"vehicle", VehicleViewSet, basename="vehicle")
router.register(r"rental", RentalViewSet, basename="rental")

urlpatterns = []
urlpatterns += router.urls