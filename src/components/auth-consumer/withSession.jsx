import React from "react";
import { PropTypes } from "prop-types";
import { useSessionData } from "../../hooks/useSessionData";

const withSession = (WrappedComponent) => {
  const WithSession = () => {
    const auth = useSessionData();
    return <WrappedComponent auth={auth} />;
  };
  return WithSession;
};
withSession.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
};
export default withSession;
