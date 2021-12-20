/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Avatar, Tooltip, Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import withSession from "../auth-consumer/withSession";

function UserAvatar({ ...props }) {
  const { auth } = props;
  const history = useHistory();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const logOut = async () => {
    try {
      handleCloseUserMenu();
      const auth = getAuth();
      await signOut(auth);
      history.push("/");
    } catch (error) {
      console.error("Error trying to logout", error);
    }
  };

  const settings = [{ label: "Logout", action: logOut }];
  return (
    <>
      {auth ? (
        <Tooltip title={auth.displayName} onClick={handleOpenUserMenu}>
          <Avatar alt={auth.displayName} src={auth.photoURL}></Avatar>
        </Tooltip>
      ) : null}
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={setting.action}>
            <Typography textAlign="center">{setting.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
export default withSession(UserAvatar);
