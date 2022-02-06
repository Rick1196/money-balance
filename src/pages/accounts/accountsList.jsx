import React from "react";
import { Box } from "@mui/material";
import { PropTypes } from "prop-types";
import AccountCard from "./accountCard";

const AccountsList = ({ accounts = [] }) => {
  return (
    <Box sx={{ height: "100%", margin: "1em 0 1em 0" }}>
      {accounts.map((account) => (
        <AccountCard
          key={`account-card-${account.uid}`}
          account={account}
          navigateToAccount={`/accounts/${account.uid}`}
        />
      ))}
    </Box>
  );
};

AccountsList.propTypes = {
  accounts: PropTypes.array,
};

export default AccountsList;
