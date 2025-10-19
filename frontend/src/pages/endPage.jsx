import { Component } from "react";
import MainBox from "../components/mainBox";
import MainCard from "../components/mainCard";
import { Box, Typography, Button, CardContent } from "@mui/material";

class EndPage extends Component {
  handleRestart = () => {
    this.props.send("RESTART");
  };

  render() {
    const { currentLanguage, context } = this.props;
    const exchangeError = !!(context && context.exchangeError);

    const texts = {
      pl: {
        title: "Koniec",
        step: "5/5",
        success: "Wymiana przebiegła pomyślnie!",
        failure: "Wymiana nie powiodła się.",
        restart: "Zacznij ponownie",
      },
      eng: {
        title: "End",
        step: "5/5",
        success: "Exchange completed successfully!",
        failure: "Exchange failed.",
        restart: "Start again",
      },
    };

    const t = texts[currentLanguage] || texts.pl;
    const message = exchangeError ? t.failure : t.success;
    const color = exchangeError ? "error.main" : "success.main";

    return (
      <MainBox>
        <MainCard maxWidth={340}>
          <CardContent>
            <Box
              textAlign="center"
            >
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                {t.title}
              </Typography>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {t.step}
              </Typography>

              <Box mt={3} mb={3}>
                <Typography variant="h5" fontWeight="bold" sx={{ color }}>
                  {message}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" color="warning" onClick={this.handleRestart}>
                  {t.restart}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </MainCard>
      </MainBox>
    );
  }
}

export default EndPage;