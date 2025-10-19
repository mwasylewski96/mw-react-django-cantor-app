from cantor_tools.tools import Result
from .models import CurrencyPair
from .models import BankValidator

class DatabaseController:
    
    def __init__(
            self
    ):
        pass
    
    @staticmethod
    def get_correct_currency_pair_and_type_of_rate(
            currency_pair,
            type_rate
    ):
        record = CurrencyPair.objects.filter(
            currency_pair=currency_pair
        ).first()
        if record is not None:
            if type_rate == "buy":
                return Result.success(record.sell_rate)
            else:
                return Result.success(record.buy_rate)
        else:
            return Result.error('No currency pair found in database!')


    def calculate_exchange(
            self,
            currency,
            type_rate,
            amount
    ):
        result = self.get_correct_currency_pair_and_type_of_rate(
            currency_pair=currency,
            type_rate=type_rate
        )
        if result.success:
            rate = result.value
            result_data = {
                "calculatedAmount": amount*rate,
                "transactionRate": rate
            }
            return Result.success(result_data)
        else:
            return Result.error(result.error)


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