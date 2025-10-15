from ninja import Schema, ModelSchema
from ..models import CurrencyPair

class CurrencySchema(ModelSchema):
    class Meta:
        model = CurrencyPair
        fields = (
            "currency_pair",
            "buy_rate",
            "sell_rate",
        )