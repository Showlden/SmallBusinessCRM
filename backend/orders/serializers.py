from rest_framework import serializers
from .models import Order
from customers.serializers import CustomerSerializer

class OrderSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    customer_detail = CustomerSerializer(source='customer', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
    
    def validate_total_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Total price must be greater than zero.")
        return value
