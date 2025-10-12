import React from "react";

const Navbar = ({ send, currentLanguage }) => {
  const toggleLanguage = () => {
    if (currentLanguage === "pl") {
      send("ENG");
    } else {
      send("PL");
    }
  };

  return (
    <header style={{ marginBottom: 20 }}>
      <button onClick={toggleLanguage}>
        {currentLanguage === "pl" ? (
          <>
            <b>PL</b> | ENG
          </>
        ) : (
          <>
            PL | <b>ENG</b>
          </>
        )}
      </button>
    </header>
  );
};

export default Navbar;
