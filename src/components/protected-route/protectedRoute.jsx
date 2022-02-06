/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { authContext } from "../auth-provider/authProvider";

const ProtectedRoute = (route) => {
  const { data, isLoading, error } = useContext(authContext);
  return (
    <Route
      path={route.path}
      render={(props, location) => {
        if (data && !error && !isLoading) {
          return <route.component {...props} />;
        } else if ((!isLoading && !data) || (error && !isLoading)) {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
