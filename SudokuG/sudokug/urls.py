from django.contrib import admin
from django.urls import path
from jogo.views import home, ranking  # Importando corretamente as views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('ranking/', ranking, name='ranking'),
]
