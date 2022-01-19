import { useState, useCallback, useEffect } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { collections } from "../constants";

const useFetchAccount = (accountUid) => {
  const [account, setAccount] = useState(null);
  const queryAccount = useCallback((accountId) => {
    const accountQuery = query(
      collection(db, `${collections.ACCOUNT_COLLECTION}`),
      where("__name__", "==", accountId)
    );
    const unsubscribe = onSnapshot(accountQuery, (querySnapshot) => {
      let account = null;
      querySnapshot.forEach((doc) => {
        account = { ...doc.data(), uid: doc.id };
      });
      setAccount(account);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (accountUid) {
      const removeTeamsSubscription = queryAccount(accountUid);
      return () => {
        removeTeamsSubscription();
      };
    }
  }, [accountUid, queryAccount]);
  return account;
};

export default useFetchAccount;
