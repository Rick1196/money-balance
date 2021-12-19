import React from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { Button } from "@mui/material";

import { auth, googleAuthProvider } from "../firebase/firebaseConfig";
import propTypes from "prop-types";

export default function GoogleAuth({ loginSuccessCallback }) {
  const loginWithGoogle = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const googleSession = await signInWithPopup(auth, googleAuthProvider);
      console.log(googleSession);
      loginSuccessCallback(googleSession);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.error(errorCode, errorMessage, email, credential);
    }
  };

  return (
    <>
      <Button onClick={loginWithGoogle}> Login with google</Button>
    </>
  );
}

GoogleAuth.propTypes = {
  loginSuccessCallback: propTypes.func.isRequired,
};
