import { Component } from "react";
import MainBox from "../components/mainBox";
import MainCard from "../components/mainCard";
import {
  Box,
  Typography,
  Button,
  CardContent,
  Divider,
} from "@mui/material";

class SummaryChoicePage extends Component {
  constructor(props) {
    super(props);

    const { context } = props;

    this.state = {
      action: context.action || "buy",
      amount: context.amount || 0,
      fromCurrency: context.fromCurrency || "PLN",
      toCurrency: context.toCurrency || "USD",
      calculatedAmount: context.calculatedAmount || 0,
      rate: context.transactionRate || 0,
    };
  }

  handleBack = () => {
    this.props.send("BACK");
  };

  handleConfirm = () => {
    this.props.send("NEXT");
  };

  render() {
    const { currentLanguage } = this.props;
    const { action, amount, fromCurrency, toCurrency, rate, calculatedAmount } = this.state;

    const texts = {
      pl: {
        title: "Podsumowanie wyboru",
        step: "3/5",
        buy: "Kupić",
        sell: "Sprzedać",
        youWillGet: "Otrzymasz",
        youNeed: "Potrzebujesz",
        toBuy: "aby kupić",
        toSell: "aby sprzedać",
        buyRate: "Kurs kupna",
        sellRate: "Kurs sprzedaży",
        back: "Cofnij",
        confirm: "Zatwierdź wymianę",
      },
      eng: {
        title: "Summary of your choice",
        step: "3/5",
        buy: "Buy",
        sell: "Sell",
        youWillGet: "You will get",
        youNeed: "You need",
        toBuy: "to buy",
        toSell: "to sell",
        buyRate: "Buy rate",
        sellRate: "Sell rate",
        back: "Back",
        confirm: "Confirm exchange",
      },
    };

    const t = texts[currentLanguage] || texts.pl;

    const isBuy = action === "buy";
    const rateLabel = isBuy ? t.buyRate : t.sellRate;

    return (
      <MainBox>
        <MainCard maxWidth={500}>
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              gap={3}
            >
              <Typography variant="h4" fontWeight="bold">
                {t.title}
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {t.step}
              </Typography>

                <Typography variant="h6" fontWeight="500">
                  {isBuy ? t.youWillGet : t.youNeed}:{" "}
                  <b>
                    {amount} {fromCurrency}
                  </b>{" "}
                </Typography>
                <Typography variant="h6" fontWeight="500">
                  {isBuy ? t.toSell : t.toBuy}{" "}
                  <b>{calculatedAmount} {toCurrency}</b>
                </Typography>
                

                <Typography variant="h6" mt={1}>
                  {rateLabel}: <strong>{rate.toFixed(2)}</strong>
                </Typography>

            
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={this.handleBack}
                  sx={{ borderRadius: 2, width: "48%" }}
                >
                  {t.back}
                </Button>

                <Button
                  variant="contained"
                  color="warning"
                  size="large"
                  onClick={this.handleConfirm}
                  sx={{ borderRadius: 2, width: "48%" }}
                >
                  {t.confirm}
                </Button>
            </Box>
          </CardContent>
        </MainCard>
      </MainBox>
    );
  }
}

export default SummaryChoicePage;
