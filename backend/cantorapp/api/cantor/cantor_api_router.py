####################
# EXTERNAL LIBRARIES
####################
import logging
from ninja.responses import codes_4xx
from ninja_extra import Router
####################
# INTERNAL LIBRARIES
####################
from ..database_controller import DatabaseController
from ..schemas.api_output_schemas import *

logger = logging.getLogger(__name__)

cantor_api_routerr = Router()

@cantor_api_routerr.get(
    '/currencies',
    response={
        200: ApiCurrenciesSchema,
        codes_4xx: ApiCurrenciesSchema
    }
)
def get_currencies(
    request
):
    db = DatabaseController()
    result = db.get_currencies()
    if result.success:
        return {
            "success": True,
            "payload": result.value,
            "message": '[SUCCESS] Successfully got currencies!'
        }
    else:
        return {
            "success": False,
            "payload": None,
            "message": f"[FAILURE] {result.error}"
        }
    
@cantor_api_routerr.get(
    '/banks',
    response={
        200: ApiResponse,
        codes_4xx: ApiResponse
    }
)
def get_banks(
    request
):
    db = DatabaseController()
    banks = db.get_banks()
    return {
        "success": True,
        "payload": banks,
        "message": '[SUCCESS] Successfully got bank names!'
    }
