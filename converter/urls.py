from django.urls import path

from .views import index, update_selected

urlpatterns = [
    path('', index, name='main_page'),
    path('update_selected', update_selected)
]
