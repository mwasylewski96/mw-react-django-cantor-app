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
  CircularProgress,
} from "@mui/material";

class ExchangeCurrencyPage extends Component {
  constructor(props) {
    super(props);

    const { context = {} } = props; // <- bezpieczny fallback
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
    const { currentLanguage = "pl", context = {} } = this.props;

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
        loading: "Ładowanie…",
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
        loading: "Loading…",
      },
    };

    const t = texts[currentLanguage] || texts.pl;
    const currencies = ["PLN", "USD", "EUR", "CHF"];
    const rates = this.props.context?.currencies || null;

    const exchangeText =
      action === "buy" ? `${t.andExchange} ${t.from}` : `${t.andExchange} ${t.to}`;

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
                {rates ? (
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
                          <TableRow key={row.currency_pair}>
                            <TableCell>{row.currency_pair}</TableCell>
                            <TableCell align="right">
                              {row.buy_rate ? row.buy_rate.toFixed(2) : "-"}
                            </TableCell>
                            <TableCell align="right">
                              {row.sell_rate ? row.sell_rate.toFixed(2) : "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box display="flex" justifyContent="center" mt={2}>
                    <CircularProgress size={24} />
                    <Typography variant="body2" ml={1}>
                      {t.loading}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </CardContent>
        </MainCard>
      </MainBox>
    );
  }
}

export default ExchangeCurrencyPage;
