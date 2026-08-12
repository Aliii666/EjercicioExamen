from rest_framework import serializers
from .models import Vehicle, Rental

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ["id", "plate", "brand", "daily_rate", "is_available" ]

class RentalSerializer(serializers.ModelSerializer):
    vehicle_id = serializers.PrimaryKeyRelatedField(source="vehicle", queryset=Vehicle.objects.all())
    vehicle_plate = serializers.CharField(source="vehicle.plate", read_only=True)

    class Meta:
        model = Rental
        fields = ["id", "vehicle_id", "vehicle_plate", "customer_name", "total", "status", "created_at"]

        