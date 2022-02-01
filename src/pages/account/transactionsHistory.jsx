import React from "react";
import { PropTypes } from "prop-types";
import SkeletonList from "../../components/skeleton/skeletonList";

const TransactionsHistory = ({ transactions }) => {
  const { data, isLoading, error } = transactions;
  return (
    <div>
      {data &&
        !isLoading &&
        !error &&
        data.map((transaction) => (
          <p key={transaction.uid}>{transaction.uid}</p>
        ))}
      {isLoading && <SkeletonList />}
    </div>
  );
};

TransactionsHistory.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default TransactionsHistory;
