from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/', include([
        path('auth/', include('account.urls')),
        path('customers/', include('customers.urls')),
        path('orders/', include('orders.urls')),
        path('schema/', SpectacularAPIView.as_view(), name='schema'),
        path('', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    ]))
]