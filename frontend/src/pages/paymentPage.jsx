import React, { Component } from "react";
import MainBox from "../components/mainBox";
import MainCard from "../components/mainCard";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  Stack,
  CardContent,
} from "@mui/material";

class PaymentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBank: null,
      clientId: "",
      password: "",
    };
  }

  selectBank = (bank) => {
    this.setState({ selectedBank: bank });
    this.props.send("BANK", bank);
  };

  handleChange = (field) => (event) => {
    const value = event.target.value;
    this.setState({ [field]: value });
    this.props.send(field.toUpperCase(), value);
  };

  handleBack = () => {
    this.props.send("BACK");
  };

  handlePay = () => {
    const { selectedBank, clientId, password } = this.state;
    this.props.send("PAY", { bank: selectedBank, clientId, password });
  };

  renderBankTile(label) {
    const { selectedBank } = this.state;
    const active = selectedBank === label;
    return (
      <Paper
        key={label}
        onClick={() => this.selectBank(label)}
        elevation={active ? 6 : 1}
        sx={{
          width: "100%",
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          cursor: "pointer",
          borderRadius: 2,
          border: active ? "2px solid" : "1px solid",
          borderColor: active ? "primary.main" : "#e0e0e0",
          bgcolor: active ? "rgba(25,118,210,0.06)" : "background.paper",
        }}
      >
        <Typography variant="h6">{label}</Typography>
      </Paper>
    );
  }

  render() {
    const { selectedBank, clientId, password } = this.state;
    const { currentLanguage, context } = this.props;
    const { banks = [] } = context || {}; // <- pobieramy banki z kontekstu

    const texts = {
      pl: {
        title: "Płatność",
        step: "4/5",
        back: "Cofnij",
        chooseBank: "Wybierz bank",
        id: "ID",
        password: "Hasło",
        pay: "Zapłać",
        noBanks: "Brak dostępnych banków",
      },
      eng: {
        title: "Payment",
        step: "4/5",
        back: "Back",
        chooseBank: "Choose bank",
        id: "ID",
        password: "Password",
        pay: "Pay",
        noBanks: "No banks available",
      },
    };

    const t = texts[currentLanguage] || texts.pl;

    return (
      <MainBox>
        <MainCard maxWidth={640}>
          <CardContent>
            <Box textAlign="center">
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                gutterBottom
              >
                {t.title}
              </Typography>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {t.step}
              </Typography>

              <Box mt={2} mb={2} display="flex" justifyContent="center">
                <Button
                  variant="outlined"
                  onClick={this.handleBack}
                  color="inherit"
                  size="large"
                  sx={{ borderRadius: 2 }}
                >
                  {t.back}
                </Button>
              </Box>

              <Box mt={2}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {t.chooseBank}:
                </Typography>

                <Grid container spacing={2} justifyContent="space-between">
                  {banks.length > 0 ? (
                    banks.map((bank) => (
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        md={3}
                        key={bank}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width: "22%"
                        }}
                      >
                        {this.renderBankTile(bank)}
                      </Grid>
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 2 }}
                    >
                      {t.noBanks}
                    </Typography>
                  )}
                </Grid>
              </Box>

              <Stack spacing={2} mt={3}>
                <TextField
                  label={t.id}
                  value={clientId}
                  onChange={this.handleChange("clientId")}
                  fullWidth
                  id="payment-id"
                />
                <TextField
                  label={t.password}
                  type="password"
                  value={password}
                  onChange={this.handleChange("password")}
                  fullWidth
                  id="payment-password"
                />
                <Box display="flex" justifyContent="center" mt={1}>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={this.handlePay}
                    disabled={!selectedBank || !clientId || !password}
                  >
                    {t.pay}
                  </Button>
                </Box>
              </Stack>
            </Box>
          </CardContent>
        </MainCard>
      </MainBox>
    );
  }
}

export default PaymentPage;