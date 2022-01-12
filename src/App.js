import React, { Suspense } from "react";
import { CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./pages/routes";
import NavBar from "./components/nav-bar";
import AuthProvider from "./components/auth-provider/authProvider";

const App = () => {
  return (
    <AuthProvider>
      <CssBaseline />
      <NavBar />
      <Container fixed maxWidth="sm">
        <Suspense fallback={<div>Loading ...</div>}>
          <Routes />
          <ToastContainer />
        </Suspense>
      </Container>
    </AuthProvider>
  );
};

export default App;
