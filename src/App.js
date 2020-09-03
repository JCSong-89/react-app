import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Theme from "./styles/Theme";
import Home from "./page/Home";
import Login from "./page/Login";
import UpdateMusic from "./page/UpdateMusic";

export default () => {
  //Route
  const authGuard = (Component) => () => {
    return localStorage.getItem("Authentication") ? (
      <Component />
    ) : (
      <Redirect to="/login" />
    );
  };

  const loginGuard = (Component) => () => {
    return localStorage.getItem("Authentication") ? (
      <Redirect to="/home" />
    ) : (
      <Component />
    );
  };

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/" render={authGuard(Home)} />
          <Route exact path="/home" render={authGuard(Home)} />
          <Route path="/login" render={loginGuard(Login)} />
        </Switch>
        <Route path="/uploading/:id" render={authGuard(UpdateMusic)} />
      </Router>
    </ThemeProvider>
  );
};
