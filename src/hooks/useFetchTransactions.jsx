import { useCallback, useEffect } from "react";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { useQuery, useQueryClient } from "react-query";
import { Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { collections, stores } from "../constants";

const useMovementsList = ({ uid, filterDate }) => {
  const queryClient = useQueryClient();
  const queryMovements = useCallback((accounUid, date) => {
    const movementsQuery = query(
      collection(
        db,
        `${collections.ACCOUNT_COLLECTION}/${accounUid}/${collections.MOVEMENTS_COLLECTION}`
      ),
      orderBy("createdAt", "desc"),
      where("createdAt", ">=", Timestamp.fromDate(date))
    );
    const querySubscription = onSnapshot(movementsQuery, (querySnapshot) => {
      const transactions = [];
      querySnapshot.forEach((doc) => {
        transactions.push({ ...doc.data(), uid: doc.id });
      });
      queryClient.setQueryData(
        `${stores.TRANSACTIONS_STORE}/${uid}`,
        transactions
      );
    });
    return querySubscription;
  }, []);

  useEffect(() => {
    if (uid && filterDate) {
      const removeTeamsSubscription = queryMovements(uid, filterDate);
      return () => {
        removeTeamsSubscription();
      };
    }
  }, [uid, queryMovements, filterDate]);
  return useQuery(
    `${stores.TRANSACTIONS_STORE}/${uid}`,
    () => new Promise(() => {}),
    {}
  );
};

export default useMovementsList;
