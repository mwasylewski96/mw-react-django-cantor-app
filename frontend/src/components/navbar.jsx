import React from "react";
import { Button } from "@mui/material";

const Navbar = ({ send, currentLanguage }) => {
  const toggleLanguage = () => {
    if (currentLanguage === "pl") {
      send("ENG");
    } else {
      send("PL");
    }
  };

  return (
    <header style={{ 
      marginTop: 20,
      marginBottom: 20,
      textAlign: "right",
      right: 20,
      position: "fixed",
      top: "0" 
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        onClick={toggleLanguage}
        sx={{
          borderRadius: 3,
          textTransform: "none",
          fontSize: "0.95rem",
          fontWeight: 500,
          width: "7rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {currentLanguage === "pl" ? (
          <>
            <b>PL</b> <span>|</span>ENG
          </>
        ) : (
          <>
            PL <span>|</span><b>ENG</b>
          </>
        )}
      </Button>
    </header>
  );
};

export default Navbar;
