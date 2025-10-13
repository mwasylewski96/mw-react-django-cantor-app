import { Component } from "react";
import MainBox from "../components/mainBox";
import MainCard from "../components/mainCard";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

class ExchangeCurrencyPage extends Component {
  constructor(props) {
    super(props);

    const { context } = props;
    this.state = {
      action: context.action || "buy",
      amount: context.amount || "",
      fromCurrency: context.fromCurrency || "PLN",
      toCurrency: context.toCurrency || "USD",
    };
  }

  handleChange = (field) => (event) => {
    const value = event.target.value;
    this.setState({ [field]: value });
    this.props.send(field.toUpperCase(), value);
  };

  handleNext = () => {
    this.props.send("NEXT");
  };

  render() {
    const { action, amount, fromCurrency, toCurrency } = this.state;
    const { currentLanguage, context } = this.props;

    const texts = {
      pl: {
        title: "Wymień walutę",
        want: "Chciałbym",
        buy: "Kupić",
        sell: "Sprzedać",
        amount: "Kwota",
        chooseCurrency: "Wybierz walutę",
        andExchange: "i zamienić",
        from: "z",
        to: "na",
        next: "Dalej",
        ratesTitle: "Aktualne kursy wymiany",
        pair: "Para",
        buyRate: "Kupno",
        sellRate: "Sprzedaż",
      },
      eng: {
        title: "Exchange currency",
        want: "I would like to",
        buy: "Buy",
        sell: "Sell",
        amount: "Amount",
        chooseCurrency: "Choose currency",
        andExchange: "and exchange",
        from: "from",
        to: "to",
        next: "Next",
        ratesTitle: "Current exchange rates",
        pair: "Pair",
        buyRate: "Buy",
        sellRate: "Sell",
      },
    };

    const t = texts[currentLanguage] || texts.pl;
    const currencies = ["PLN", "USD", "EUR", "CHF"];

    const exchangeText =
      action === "buy" ? `${t.andExchange} ${t.from}` : `${t.andExchange} ${t.to}`;

    const rates = context.rates || [
      { pair: "USD/PLN", buy: 4.12, sell: 4.18 },
      { pair: "EUR/PLN", buy: 4.36, sell: 4.42 },
      { pair: "CHF/PLN", buy: 4.59, sell: 4.65 },
      { pair: "EUR/USD", buy: 1.06, sell: 1.08 },
      { pair: "EUR/CHF", buy: 0.96, sell: 0.98 },
      { pair: "CHF/USD", buy: 1.09, sell: 1.11 },
    ];

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

              <Box display="flex" flexDirection="column" gap={2} width="100%">
                <Typography variant="body1" fontWeight="500">
                  {t.want}
                </Typography>

                <TextField
                  select
                  value={action}
                  onChange={this.handleChange("action")}
                  fullWidth
                >
                  <MenuItem value="buy">{t.buy}</MenuItem>
                  <MenuItem value="sell">{t.sell}</MenuItem>
                </TextField>

                <TextField
                  label={t.amount}
                  value={amount}
                  onChange={this.handleChange("amount")}
                  type="number"
                  fullWidth
                  inputProps={{ min: 0 }}
                />

                <TextField
                  select
                  label={t.chooseCurrency}
                  value={fromCurrency}
                  onChange={this.handleChange("fromCurrency")}
                  fullWidth
                >
                  {currencies.map((cur) => (
                    <MenuItem key={cur} value={cur}>
                      {cur}
                    </MenuItem>
                  ))}
                </TextField>

                <Typography variant="body1" textAlign="center">
                  {exchangeText}
                </Typography>

                <TextField
                  select
                  label={t.chooseCurrency}
                  value={toCurrency}
                  onChange={this.handleChange("toCurrency")}
                  fullWidth
                >
                  {currencies.map((cur) => (
                    <MenuItem key={cur} value={cur}>
                      {cur}
                    </MenuItem>
                  ))}
                </TextField>

                <Button
                  variant="contained"
                  color="warning"
                  size="large"
                  onClick={this.handleNext}
                  sx={{ mt: 2, borderRadius: 2 }}
                >
                  {t.next}
                </Button>
              </Box>

              <Box mt={1} width="100%">
                <Typography variant="h6" gutterBottom>
                  {t.ratesTitle}
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>{t.pair}</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>{t.buyRate}</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>{t.sellRate}</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rates.map((row) => (
                        <TableRow key={row.pair}>
                          <TableCell>{row.pair}</TableCell>
                          <TableCell align="right">{row.buy.toFixed(2)}</TableCell>
                          <TableCell align="right">{row.sell.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </CardContent>
        </MainCard>
      </MainBox>
    );
  }
}

export default ExchangeCurrencyPage;
