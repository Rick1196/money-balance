import React, { Suspense } from "react";
import { CssBaseline } from "@mui/material";
import { Router, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import NavBar from "./components/nav-bar";
import history from "./pages/history";
import Subroute from "./components/subroute";
import routes from "./pages/routes";
import AuthProvider from "./components/auth-provider/authProvider";

const App = () => {
  return (
    <AuthProvider>
      <Router history={history}>e
        <CssBaseline />
        <NavBar />
        <Container fixed maxWidth="sm">
          <Suspense fallback={<div>Loading ...</div>}>
            <Routes>
              {routes.map((route) => (
                <Subroute key={route.key} {...route} />
              ))}
              <Route
                component={() => (
                  <h1>
                    Holy guacamole we do Not found the page you are looking
                    for!!
                  </h1>
                )}
              />
            </Routes>
          </Suspense>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
