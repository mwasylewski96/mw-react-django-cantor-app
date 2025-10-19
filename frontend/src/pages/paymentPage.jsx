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
    const { currentLanguage } = this.props;

    const texts = {
      pl: {
        title: "Płatność",
        step: "4/5",
        back: "Cofnij",
        chooseBank: "Wybierz bank",
        id: "ID",
        password: "Hasło",
        pay: "Zapłać",
      },
      eng: {
        title: "Payment",
        step: "4/5",
        back: "Back",
        chooseBank: "Choose bank",
        id: "ID",
        password: "Password",
        pay: "Pay",
      },
    };

    const t = texts[currentLanguage] || texts.pl;

    return (
      <MainBox>
        <MainCard maxWidth={640}>
          <CardContent>
            <Box
              textAlign="center"> 
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
                <Button variant="outlined" onClick={this.handleBack} color="inherit" size="large" sx={{ borderRadius: 2 }}>
                  {t.back}
                </Button>
              </Box>

              <Box mt={2}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {t.chooseBank}:
                </Typography>

                <Grid container spacing={2} justifyContent="space-between">
                  <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", width: "22%"}}>
                    {this.renderBankTile("ALFA")}
                  </Grid>
                  <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", width: "22%"}}>
                    {this.renderBankTile("BETA")}
                  </Grid>
                  <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", width: "22%" }}>
                    {this.renderBankTile("GAMMA")}
                  </Grid>
                  <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", width: "22%" }}>
                    {this.renderBankTile("OMEGA")}
                  </Grid>
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