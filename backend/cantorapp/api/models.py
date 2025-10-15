from django.db import models

class CurrenciesValidator(models.TextChoices):
    
    EURPLN = "EUR/PLN", "EUR/PLN"
    USDPLN = "USD/PLN", "USD/PLN"
    CHFPLN = "CHF/PLN", "CHF/PLN"
    EURUSD = "EUR/USD", "EUR/USD"
    EURCHF = "EUR/CHF", "EUR/CHF"
    USDCHF = "USD/CHF", "USD/CHF"
    
    PLNEUR = "PLN/EUR", "PLN/EUR"
    PLNUSD = "PLN/USD", "PLN/USD"
    PLNCHF = "PLN/CHF", "PLN/CHF"
    USDEUR = "USD/EUR", "USD/EUR"
    CHFEUR = "CHF/EUR", "CHF/EUR"
    CHFUSD = "CHF/USD", "CHF/USD"
    
class BankValidator(models.TextChoices):
    ALFA = "ALFA"
    BETA = "BETA"
    GAMMA = "GAMMA"
    OMEGA = "OMEGA"

class CurrencyPair(models.Model):
    class Meta:
        ordering = ['created_at']

    currency_pair = models.CharField(
        max_length=7,
        unique=True,
        choices=CurrenciesValidator.choices
    )
    buy_rate = models.FloatField()
    sell_rate = models.FloatField()
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(
            self
    ):
        return f"{self.currency_pair}: {self.buy_rate} {self.sell_rate}"