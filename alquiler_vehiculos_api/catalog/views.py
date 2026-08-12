from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from .models import Vehicle, Rental
from .serializers import VehicleSerializer, RentalSerializer
from .permissions import IsAdminOrReadOnly

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all().order_by("id")
    serializer_class = VehicleSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ["plate"]
    ordering_fields = ["id", "plate", "brand", "daily_rate", "is_available" ]

class RentalViewSet(viewsets.ModelViewSet):
    queryset = Rental.objects.select_related("vehicle").all().order_by("-id")
    serializer_class = RentalSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["vehicle"]
    search_fields = ["vehicle__plate", "customer_name", "status"]
    ordering_fields = ["id", "status", "vehicle", "total", "created_at"]

    def get_permissions(self):
        # Público: SOLO listar vehículos
        if self.action == "list":
            return [AllowAny()]
        return super().get_permissions()