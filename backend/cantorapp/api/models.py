from django.db import models

class CurrenciesValidator(models.TextChoices):
    
    EURPLN = "EUR/PLN"
    USDPLN = "USD/PLN"
    CHFPLN = "CHF/PLN"
    EURUSD = "EUR/USD"
    EURCHF = "EUR/CHF"
    USDCHF = "USD/CHF"
    
    PLNEUR = "PLN/EUR"
    PLNUSD = "PLN/USD"
    PLNCHF = "PLN/CHF"
    USDEUR = "USD/EUR"
    CHFEUR = "CHF/EUR"
    CHFUSD = "CHF/USD"
    
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