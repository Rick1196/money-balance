/* eslint-disable react/prop-types */
import React, {useContext} from "react";
import { Redirect, Route } from "react-router-dom";
import { authContext } from "../auth-provider/authProvider";

const ProtectedRoute = (route) => {
  console.log("route", route);
  const auth = useContext(authContext);
  return (
    <Route
      path={route.path}
      render={(props, location) =>
        // pass the sub-routes down to keep nesting
        auth ? (
          <route.component {...props} routes={route.routes} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
