import { useCallback, useEffect } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { useQuery, useQueryClient } from "react-query";
import { db } from "../firebase/config";
import { collections, stores } from "../constants";
const useFetchExpenses = (accounUid, transactionUid) => {
  const queryClient = useQueryClient();
  const expenses = useCallback((accountId, transactionId) => {
    const expensesQuery = query(
      collection(
        db,
        collections.MOVEMENTS_EXPENSES_COLLECTION([
          collections.ACCOUNT_COLLECTION,
          accountId,
          collections.MOVEMENTS_COLLECTION,
          transactionId,
        ])
      ),
      orderBy("createdAt", "desc")
    );
    const querySubscription = onSnapshot(expensesQuery, (querySnapshot) => {
      const expenses = [];
      querySnapshot.forEach((doc) => {
        expenses.push({ ...doc.data(), uid: doc.id });
      });
      queryClient.setQueryData(`${stores.EXPENSES_STORE}/${transactionUid}`, expenses);
    });
    return querySubscription;
  });

  useEffect(() => {
    if (accounUid && transactionUid) {
      const removeExpensesSubscription = expenses(accounUid, transactionUid);
      return () => {
        removeExpensesSubscription();
      };
    }
  }, [accounUid, transactionUid, expenses]);
  return useQuery(
    `${stores.EXPENSES_STORE}/${transactionUid}`,
    () => new Promise(() => {}),
    {}
  );
};

export default useFetchExpenses;
