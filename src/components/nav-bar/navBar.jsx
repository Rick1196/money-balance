import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import UserAvatar from "./userAvatar";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const NavBar = () => {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/accounts">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Money Balance
            </Typography>
          </Link>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Money Balance
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <UserAvatar />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
