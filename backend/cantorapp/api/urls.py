####################
# EXTERNAL LIBRARIES
####################
from django.urls import path
####################
# INTERNAL LIBRARIES
####################
from .views import *
from .main_router import api

urlpatterns = [
    path(
        'api/',
        api.urls
    ),
]