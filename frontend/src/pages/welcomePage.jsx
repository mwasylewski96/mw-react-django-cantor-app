import { Component } from "react";
import MainBox from "../components/mainBox";
import MainCard from "../components/mainCard";

import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  CardContent,
  Divider,
} from "@mui/material";
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
      <MainBox>
        <MainCard
          maxWidth={400}
        >
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              gap={3}
            >
              <Typography variant="h4" component="h1" fontWeight="bold">
                {t.title}
              </Typography>

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

              <Button
                variant="contained"
                color="warning"
                onClick={this.handleStart}
                size="large"
                disabled={!accepted}
                sx={{ width: "70%", borderRadius: 2 }}
              >
                {t.start}
              </Button>

              <Button
                variant="text"
                startIcon={<FaSearch />}
                color="primary"
                onClick={this.toggleRules}
              >
                {t.read}
              </Button>

              {showRules && (
                <Box
                  mt={1}
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    p: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    backgroundColor: "#fafafa",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {t.rulesTitle}
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {t.rulesContent}
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </MainCard>
      </MainBox>
    );
  }
}

export default WelcomePage;
