import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../../page/Home";
import Login from "../../page/Login";
import React from "react";
import UpdateMusic from "../../page/UpdateMusic";

const LoggedInRoutes = () => (
  <>
    <Route exact path="/" component={Home} />
  </>
);
const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={Login} />
  </>
);

const UpdateMusicRoutes = () => (
  <>
    <Route exact path="/update" component={UpdateMusic} />
  </>
);

const AppRouter = ({ isLogged }) => (
  <Router>
    <Switch>{isLogged ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
    <UpdateMusicRoutes />
  </Router>
);

export default AppRouter;
