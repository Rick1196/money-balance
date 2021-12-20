import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./login";
import Accounts from "./accounts";
import ProtectedRoute from "../components/protected-route/protectedRoute";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <ProtectedRoute exact path="/accounts" component={Accounts} />
      <Route
        component={() => (
          <h1>Holy guacamole we do Not found the page you are looking for!!</h1>
        )}
      />
    </Switch>
  );
};

export default Routes;
