import { Component } from "react";
import { Box, Typography, Button, FormControlLabel, Checkbox } from "@mui/material";
import { FaSearch } from "react-icons/fa";

class WelcomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accepted: false,
      showRules: false,
    };
  }

  handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    this.setState({ accepted: checked });

    if (checked) {
      this.props.send("ACCEPT");
    }
  };

  handleStart = () => {
    this.props.send("NEXT");
  };

  toggleRules = () => {
    this.setState((prev) => ({ showRules: !prev.showRules }));
  };

  render() {
    const { currentLanguage } = this.props;
    const { accepted, showRules } = this.state;

    const texts = {
      pl: {
        title: "Cantor App",
        start: "Rozpocznij",
        accept: "Akceptuję regulamin",
        read: "Przeczytaj regulamin",
        rulesTitle: "Regulamin",
        rulesContent:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet arcu vitae mi fringilla dictum. Integer cursus, sapien sed scelerisque hendrerit, lectus metus tincidunt ex, et pulvinar purus ipsum nec justo.",
      },
      eng: {
        title: "Cantor App",
        start: "Start",
        accept: "I accept the terms",
        read: "Read the rules",
        rulesTitle: "Rules",
        rulesContent:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet arcu vitae mi fringilla dictum. Integer cursus, sapien sed scelerisque hendrerit, lectus metus tincidunt ex, et pulvinar purus ipsum nec justo.",
      },
    };

    const t = texts[currentLanguage] || texts.pl;

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        textAlign="center"
        gap={3}
      >
        {/* Tytuł */}
        <Typography variant="h3" component="h1">
          {t.title}
        </Typography>

        {/* Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={accepted}
              onChange={this.handleCheckboxChange}
              color="primary"
            />
          }
          label={t.accept}
        />

        {/* Przycisk Start */}
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleStart}
          size="large"
        >
          {t.start}
        </Button>

        {/* Przycisk Przeczytaj regulamin z lupką */}
        <Button
          variant="text"
          startIcon={<FaSearch />}
          color="secondary"
          onClick={this.toggleRules}
        >
          {t.read}
        </Button>

        {/* Regulamin pod spodem po kliknięciu przycisku „Przeczytaj regulamin” */}
        {showRules && (
          <Box
            mt={4}
            sx={{
              maxWidth: 600,
              textAlign: "left",
              p: 3,
              border: "1px solid #ccc",
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h5" gutterBottom>
              {t.rulesTitle}
            </Typography>
            <Typography variant="body1">{t.rulesContent}</Typography>
          </Box>
        )}
      </Box>
    );
  }
}

export default WelcomePage;
