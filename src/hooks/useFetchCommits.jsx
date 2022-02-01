import { useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { collections, stores } from "../constants";

const useFetchCommits = ({ uid }) => {
  const queryClient = useQueryClient();
  const queryCommits = useCallback((accounUid) => {
    const movementsQuery = query(
      collection(
        db,
        `${collections.ACCOUNT_COLLECTION}/${accounUid}/${collections.COMMIT_COLLECTION}`
      ),
      orderBy("transactionData.createdAt", "desc")
    );
    const querySubscription = onSnapshot(movementsQuery, (querySnapshot) => {
      const commits = [];
      querySnapshot.forEach((doc) => {
        commits.push({ ...doc.data(), uid: doc.id });
      });
      queryClient.setQueryData(`${stores.COMMITS_STORE}/${uid}`, commits);
    });
    return querySubscription;
  }, []);
  useEffect(() => {
    if (uid) {
      const removeTeamsSubscription = queryCommits(uid);
      return () => {
        removeTeamsSubscription();
      };
    }
  }, [uid, queryCommits]);
  return useQuery(
    `${stores.COMMITS_STORE}/${uid}`,
    () => new Promise(() => {}),
    {}
  );
};

export default useFetchCommits;
