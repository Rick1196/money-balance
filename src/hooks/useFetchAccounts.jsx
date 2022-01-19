import { useCallback, useEffect } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { useQuery, useQueryClient } from "react-query";
import { db } from "../firebase/config";
import { collections, stores } from "../constants";

const useFetchAccounts = (userData) => {
  const queryClient = useQueryClient();
  const queryTeams = useCallback((userData) => {
    const q = query(
      collection(db, collections.ACCOUNT_COLLECTION),
      where("owner", "==", userData.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const accounts = [];
      querySnapshot.forEach((doc) => {
        accounts.push({ ...doc.data(), uid: doc.id });
      });
      queryClient.setQueryData(stores.ACCOUNTS_STORE, accounts);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (userData) {
      const removeTeamsSubscription = queryTeams(userData);
      return () => {
        removeTeamsSubscription();
      };
    }
  }, [userData, queryTeams]);
  return useQuery(stores.ACCOUNTS_STORE, () => new Promise(() => {}), {});
};

export default useFetchAccounts;
