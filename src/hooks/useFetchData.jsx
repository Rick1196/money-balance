import { useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import { subscribe } from "../api/firebaseServices";

const useFetchData = (firebasePathKey, options = {}) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const unsubscribe = subscribe({
      callback: (val) => {
        queryClient.setQueryData(firebasePathKey, val);
      },
    });

    return () => unsubscribe();
  }, [queryClient, firebasePathKey]);

  return useQuery(firebasePathKey, () => new Promise(() => {}), options);
};

export default useFetchData;
