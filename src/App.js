import React, { Suspense } from "react";
import { CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";
import { ToastContainer } from "react-toastify";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import "react-toastify/dist/ReactToastify.css";
import Routes from "./pages/routes";
import NavBar from "./components/nav-bar";
import AuthProvider from "./components/auth-provider/authProvider";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
