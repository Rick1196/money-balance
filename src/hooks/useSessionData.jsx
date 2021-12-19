import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
const useSessionData = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    const unsuscribeSession = auth.onAuthStateChanged((session) => {
      setSession(session);
    });
    return () => unsuscribeSession();
  }, []);
  return session;
};

export default useSessionData;
