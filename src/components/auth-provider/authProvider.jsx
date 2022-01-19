import React, { createContext } from "react";
import PropTypes from "prop-types";
import useSessionData from "../../hooks/useSessionData";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const {data, isLoading, error} = useSessionData();

  return <authContext.Provider value={{data, isLoading, error}}>{children}</authContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;