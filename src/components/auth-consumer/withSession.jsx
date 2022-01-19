import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import { authContext } from "../auth-provider/authProvider";

const withSession = (WrappedComponent) => {
  const WithSession = () => {
    const {data, isLoading, error} = useContext(authContext);
    return <WrappedComponent auth={{data, isLoading, error}} />;
  };
  return WithSession;
};
withSession.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
};
export default withSession;
