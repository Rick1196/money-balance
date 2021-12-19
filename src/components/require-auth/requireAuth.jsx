import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useSessionData from "../../hooks/useSessionData";

const RequireAuth = ({ children }) => {
  const { authed } = useSessionData();

  return authed ? children : <Navigate to="/" replace />;
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
