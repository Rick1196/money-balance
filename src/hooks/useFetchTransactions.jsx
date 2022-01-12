import { useState, useCallback, useEffect } from "react";
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../firebase/config";
import { collections } from "../constants";

const useMovementsList = ({ uid }) => {
  const [movementsList, setMovementsList] = useState(null);
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
      setMovementsList(transactions);
    });
    return querySubscription;
  }, []);

  useEffect(() => {
    if (uid) {
      console.log(uid);
      const removeTeamsSubscription = queryMovements(uid);
      return () => {
        removeTeamsSubscription();
      };
    }
  }, [uid, queryMovements]);
  return movementsList;
};

export default useMovementsList;
