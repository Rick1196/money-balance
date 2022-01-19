import { useCallback, useEffect } from "react";
import { onSnapshot, collection, query } from "firebase/firestore";
import { useQuery, useQueryClient } from "react-query";
import { db } from "../firebase/config";
import { collections, stores } from "../constants";

const useMovementsList = ({ uid }) => {
  const queryClient = useQueryClient();
  const queryMovements = useCallback((accounUid) => {
    const movementsQuery = query(
      collection(
        db,
        `${collections.ACCOUNT_COLLECTION}/${accounUid}/${collections.MOVEMENTS_COLLECTION}`
      )
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
    if (uid) {
      const removeTeamsSubscription = queryMovements(uid);
      return () => {
        removeTeamsSubscription();
      };
    }
  }, [uid, queryMovements]);
  return useQuery( `${stores.TRANSACTIONS_STORE}/${uid}`, () => new Promise(() => {}), {});
};

export default useMovementsList;
