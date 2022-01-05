import { useState, useCallback, useEffect } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { collections } from "../constants";

const useFetchAccounts = (userData) => {
  const [accountsList, setTeamList] = useState(null);
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
      console.log(accounts);
      setTeamList(accounts);
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
  return accountsList;
};

export default useFetchAccounts;
