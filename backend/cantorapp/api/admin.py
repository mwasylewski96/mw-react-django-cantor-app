######################
# EXTERNAL LIBRARIES #
######################
from django.contrib import admin
######################
# INTERNAL LIBRARIES #
######################
from .models import *

register_list = [
    CurrencyPair
]

for register_element in register_list:
    admin.site.register(register_element)
