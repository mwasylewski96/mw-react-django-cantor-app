from ninja import Schema, Field
from typing import List, Dict, Any, Optional, Literal
from .output_schemas import CurrencySchema
from ..models import BankValidator, CurrenciesValidator

class ApiPayInputSchema(Schema):
    amount: float = Field(gt=0, le=1000)
    bank:  BankValidator
    id: str
    password: str
    force_outcome: Optional[
        Literal[
            "success",
            "payment_failed",
            "server_error",
            "timeout"]
    ] = None

class ApiTransactionInputSchema(Schema):
    transactionId: int
    currency: CurrenciesValidator
    type: Literal["buy", "sell"]
    amount: float = Field(gt=0, le=1000)
    force_outcome: Optional[
        Literal[
            "success",
            "not_found",
            "server_error",
            "timeout"
        ]
    ] = None

class ApiCalculationInputSchema(Schema):
    currency: CurrenciesValidator
    type_rate: Literal['buy', 'sell']
    amount: float = Field(gt=0, le=1000) 