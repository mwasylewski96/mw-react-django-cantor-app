from ninja import Schema
from typing import List, Dict, Any, Optional
from .output_schemas import CurrencySchema


class Response:
    success: bool
    payload: Any
    message: Optional[str] = None

class ApiResponse(Response, Schema):
    pass


class ApiCurrenciesSchema(Response, Schema):
    payload: List[CurrencySchema] | None