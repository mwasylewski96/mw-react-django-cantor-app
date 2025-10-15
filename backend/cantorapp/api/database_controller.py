from cantor_tools.tools import Result
from .models import CurrencyPair
from .models import BankValidator

class DatabaseController:
    
    def __init__(
            self
    ):
        pass

    @staticmethod
    def get_currencies():
        records = CurrencyPair.objects.all()
        if records:
            return Result.success(
                value=records
            )
        else:
            return Result.error(
                error='[ERROR] No available currency pairs in database'
            )
    
    @staticmethod
    def get_banks():
        return [choice[0] for choice in BankValidator.choices]