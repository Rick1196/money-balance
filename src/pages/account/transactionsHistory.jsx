import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Typography } from "@mui/material";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import { PropTypes } from "prop-types";
import { format } from "date-fns";
import SkeletonList from "../../components/skeleton/skeletonList";
import { currencyFormatter, transactions } from "../../constants";
import { truncateString } from "../../utils/strings";

const TransactionItem = ({ transaction }) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: "auto 0" }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        <Typography variant="caption" component="div">
          {format(transaction.transactionData.createdAt.toDate(), "Pp")}
        </Typography>

        <Typography variant="h6" component="div">
          {currencyFormatter.format(transaction.previousAccountAmount)}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot
          color={
            transaction.transactionData.transactionType === transactions.INCOME
              ? "primary"
              : "grey"
          }
        >
          <ForkRightIcon />
          <Typography variant="h6" component="div">
            {currencyFormatter.format(transaction.transactionData.amount)}
          </Typography>
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Typography variant="h6" component="div">
          {transaction.transactionData.transactionType === transactions.WITHDRAW
            ? "Withdraw"
            : "Income"}
        </Typography>
        <Typography variant="h6" component="div">
          {currencyFormatter.format(transaction.updatedAmmount)}
        </Typography>
        <Typography>{truncateString(transaction.transactionData.description, 27)}</Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

const TransactionsHistory = ({ transactions }) => {
  const { data, isLoading, error } = transactions;
  return (
    <div>
      {data && !isLoading && !error && (
        <Timeline>
          {data.map((transaction) => (
            <TransactionItem transaction={transaction} key={transaction.uid} />
          ))}
        </Timeline>
      )}
      {isLoading && <SkeletonList />}
    </div>
  );
};

TransactionItem.propTypes = {
  transaction: PropTypes.object.isRequired,
  icon: PropTypes.element.isRequired,
};

TransactionsHistory.propTypes = {
  transactions: PropTypes.object.isRequired,
};

export default TransactionsHistory;
