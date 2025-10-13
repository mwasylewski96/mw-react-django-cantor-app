import { Component } from "react";
import MainBox from "../components/mainBox";
import MainCard from "../components/mainCard";
import { Box, Typography, Button, CardContent } from "@mui/material";

class ExchangeCalculatorPage extends Component {
  handleNext = () => {
    this.props.send("NEXT");
  };

  handleBack = () => {
    this.props.send("BACK");
  };

  render() {
    const { currentLanguage, context } = this.props;

    const texts = {
      pl: {
        title: "Kalkulator wymiany",
        step: "2/5",
        wouldLike: "Chciałbym",
        buy: "Kupić",
        sell: "Sprzedać",
        andExchange: "i zamienić",
        from: "z",
        to: "na",
        receive: "Otrzymasz",
        need: "Potrzebujesz",
        back: "Cofnij",
        next: "Dalej",
      },
      eng: {
        title: "Exchange Calculator",
        step: "2/5",
        wouldLike: "I would like to",
        buy: "Buy",
        sell: "Sell",
        andExchange: "and exchange",
        from: "from",
        to: "to",
        receive: "You will receive",
        need: "You need",
        back: "Back",
        next: "Next",
      },
    };

    const t = texts[currentLanguage] || texts.pl;

    const { action, amount, fromCurrency, toCurrency, calculatedAmount } = context || {};

    const exchangeText = `${t.andExchange} ${fromCurrency} ${t.to} ${toCurrency}`;

    const summaryText =
      action === "buy"
        ? `${t.need} ${calculatedAmount} ${toCurrency}`
        : `${t.receive} ${calculatedAmount} ${toCurrency}`;

    return (
      <MainBox>
        <MainCard maxWidth={500}>
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              gap={2}
            >
              <Typography variant="h4" fontWeight="bold">
                {t.title}
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {t.step}
              </Typography>

              <Typography variant="body1">{t.wouldLike}</Typography>

              <Typography variant="h5" fontWeight="bold">
                {action === "buy" ? t.buy : t.sell}
              </Typography>

              <Typography variant="h5" fontWeight="bold">
                {amount} {fromCurrency}
              </Typography>

              <Typography variant="body1">{exchangeText}</Typography>

              <Typography variant="h5" fontWeight="bold">
                {summaryText}
              </Typography>
              
                <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    onClick={this.handleBack}
                    sx={{ borderRadius: 2, width: "100%" }}
                >
                    {t.back}
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    size="large"
                    onClick={this.handleNext}
                    sx={{ borderRadius: 2, width: "100%" }}
                >
                    {t.next}
                </Button>
            </Box>
          </CardContent>
        </MainCard>
      </MainBox>
    );
  }
}

export default ExchangeCalculatorPage;
