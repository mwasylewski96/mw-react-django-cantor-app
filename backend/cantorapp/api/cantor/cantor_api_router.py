####################
# EXTERNAL LIBRARIES
####################
import random
from http import HTTPStatus
import logging
from ninja import Query
from ninja.responses import codes_4xx
from ninja_extra import Router
from ninja.errors import HttpError
import time
####################
# INTERNAL LIBRARIES
####################
from ..database_controller import DatabaseController
from ..schemas.api_output_schemas import *
from ..schemas.api_input_schemas import *

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


@cantor_api_routerr.post("/pay")
def pay(
    request,
    pay_input: ApiPayInputSchema,
):
    """
    Payment simulation.
    - 30% for success
    - 30% for 402 Payment Required
    - 30% for 500 Server Error
    - 10% for timeout
    By defining `force_outcome` You can force chosen outcome.
    """

    outcomes = {
        "success": 0.7,
        "payment_failed": 0.1,
        "server_error": 0.1,
        "timeout": 0.1,
    }
    
    result = (
        pay_input.force_outcome
        if pay_input.force_outcome in outcomes
        else random.choices(
            population=list(outcomes.keys()),
            weights=list(outcomes.values()),
            k=1,
        )[0]
    )

    match result:
        case "success":
            time.sleep(3)
            return {
                "success": True,
                "payload": {
                    "transactionId": random.randint(1, 1_000)
                },
                "message": "[SUCCESS] Payment proceeded successfully!",
            }

        case "payment_failed":
            time.sleep(2)
            raise HttpError(
                HTTPStatus.PAYMENT_REQUIRED,
                "[ERROR] Payment could not be processed. Insufficient funds or invalid credentials.",
            )

        case "server_error":
            time.sleep(1)
            raise HttpError(
                HTTPStatus.INTERNAL_SERVER_ERROR,
                "[ERROR] Internal server error during payment processing.",
            )

        case "timeout":
            time.sleep(10)
            raise HttpError(
                HTTPStatus.REQUEST_TIMEOUT,
                "[ERROR] Payment service timeout. Please try again later.",
            )

        case _:
            raise HttpError(
                HTTPStatus.INTERNAL_SERVER_ERROR,
                "[ERROR] Unknown payment processing state.",
            )

@cantor_api_routerr.post("/transaction")
def transaction(
    request,
    transaction_input: ApiTransactionInputSchema
):
    """
    Transaction simulation:
    - 30% for success            - success
    - 30% for NOT FOUND (400)    - not_found
    - 30% for SERVER ERROR (500) - server_error
    - 10% for TIMEOUT (408)      - timeout
    """

    outcomes = ["success", "not_found", "server_error", "timeout"]
    weights = [0.7, 0.1, 0.1, 0.1]

    result = transaction_input.force_outcome or random.choices(
        population=outcomes,
        weights=weights,
        k=1
    )[0]

    match result:
        case "success":
            time.sleep(3)
            return {
                "success": True,
                "payload": None,
                "message": "[SUCCESS] Transaction executed successfully!",
            }

        case "not_found":
            raise HttpError(
                HTTPStatus.BAD_REQUEST,
                "[ERROR] Transaction not found or invalid transactionId.",
            )

        case "server_error":
            raise HttpError(
                HTTPStatus.INTERNAL_SERVER_ERROR,
                "[ERROR] Internal server error while processing transaction.",
            )

        case "timeout":
            time.sleep(10)
            raise HttpError(
                HTTPStatus.REQUEST_TIMEOUT,
                "[ERROR] Transaction service timeout. Please try again later.",
            )

        case _:
            time.sleep(1)
            raise HttpError(
                HTTPStatus.INTERNAL_SERVER_ERROR,
                "[ERROR] Unknown transaction state.",
            )
        
@cantor_api_routerr.post(
    '/calculate',
)
def calculate(
    request,
    calculation_input: ApiCalculationInputSchema
):
    db = DatabaseController()
    result = db.calculate_exchange(
        **calculation_input.model_dump()
    )
    if result.success:
        return {
            "success": True,
            "payload": result.value,
            "message": "[SUCCESS] Succesfully calculated amount!"
        }
    else:
        return {
            "success": False,
            "payload": None,
            "message": f"[FAILURE] {result.error}"
        }
    