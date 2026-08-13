from rest_framework import serializers

class Action:
        CREATED = "creado"
        UPDATED = "actualizado"
        MAINTENANCE = "en mantenimiento"
        DISABLED = "desactivado"

        CHOICES = [
            (CREATED, "creado"),
            (UPDATED, "actualizado"),
            (MAINTENANCE, "en mantenimiento"),
            (DISABLED, "desactivado"),
        ]

class Source:
        SYSTEM = "sistema"
        MOBILE = "móvil"

        CHOICES = [
            (SYSTEM, "sistema"),
            (MOBILE, "móvil"),
        ]


class FleetLogsSerializer(serializers.Serializer):
    vehicle_id  = serializers.CharField(max_length=10)
    action = serializers.ChoiceField(choices=Action.CHOICES,default=Action.CREATED)
    note = serializers.CharField(required=False, allow_blank=True)
    source = serializers.ChoiceField(choices=Source.CHOICES,default=Source.SYSTEM)
    created_at  = serializers.DateTimeField(required=False)

    
class EventType :
        CREATED = "created"
        PICKED_UP = "picked_up"
        RETURNED = "returned"
        PAID = "paid"
        CANCELLED = "cancelled"

        CHOICES = [
            (CREATED, "created"),
            (PICKED_UP, "picked_up"),
            (RETURNED, "returned"),
            (PAID, "paid"),
            (CANCELLED, "cancelled"),
        ]

class Source:
        WEB = "web"
        MOBILE = "mobile"
        SYSTEM = "system"

        CHOICES = [
            (WEB, "Web"),
            (MOBILE, "Mobile"),
            (SYSTEM, "System"),
        ]

class RentalEventsSerializer(serializers.Serializer):
    rental = serializers.IntegerField()        # ID de Vehiculo (Postgres)
    event_type = serializers.ChoiceField(choices=EventType.CHOICES,default=EventType.CREATED)  # ObjectId (string) de service_types
    source = serializers.ChoiceField(choices=Source.CHOICES,default=Source.WEB)   # No se envía desde el cliente; el backend asigna la fecha actual al crear
    note = serializers.CharField(required=False, allow_blank=True)
    created_at = serializers.DateTimeField(required=False)