####################
# EXTERNAL LIBRARIES
####################
from django.conf import settings
from ninja_extra import NinjaExtraAPI
####################
# INTERNAL LIBRARIES
####################
from .cantor.cantor_api_router import cantor_api_routerr
from .auth import check_auth

api = NinjaExtraAPI()

# api.add_router('/cantor', cantor_api_routerr, auth=check_auth)
api.add_router('/cantor', cantor_api_routerr)