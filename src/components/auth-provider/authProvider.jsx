import React, { createContext } from "react";
import PropTypes from "prop-types";
import useSessionData from "../../hooks/useSessionData";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = useSessionData();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;