import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { auth } from "../firebase/config";
import { stores } from "../constants";
const useSessionData = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const unsuscribeSession = auth.onAuthStateChanged((session) => {
      queryClient.setQueriesData(stores.SESSION_STORE,session);
    });
    return () => unsuscribeSession();
  }, []);
  return useQuery(stores.SESSION_STORE, () => new Promise(() => {}), {});
};

export default useSessionData;
