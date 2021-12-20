import React from "react";
import { useHistory } from "react-router-dom";
import Styles from "./login.styles";
import GoogleAuth from "../../components/google-auth";
const Login = () => {
  const history = useHistory();
  const onLoginSuccess = (userData) => {
    console.log(userData);
    history.push("/accounts");
  };
  return (
    <Styles.PageContainer>
      Login to use the app
      <GoogleAuth loginSuccessCallback={onLoginSuccess} />
    </Styles.PageContainer>
  );
};
export default Login;
