import React, { useMemo } from "react";
import { Typography } from "@mui/material";
import { PropTypes } from "prop-types";

const AccountBalance = ({ accounts }) => {
  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  const total = useMemo(() => {
    return accounts.reduce((acc, account) => acc + account.amount, 0);
  }, [accounts]);
  return (
    <Typography variant="h4" gutterBottom component="div">
      Total: {formatAmount(total)}
    </Typography>
  );
};
AccountBalance.propTypes = {
  accounts: PropTypes.array.isRequired,
};
export default AccountBalance;
