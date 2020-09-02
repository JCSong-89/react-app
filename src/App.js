import React from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "./styles/GlobalStyles";
import Theme from "./styles/Theme";

import { LOGIN_ROUTER } from "./components/index";

export default () => {
  const isLogged = localStorage.getItem("Authentication") ? true : false;

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <LOGIN_ROUTER isLogged={isLogged} />
    </ThemeProvider>
  );
};
