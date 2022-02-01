/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Container, Button } from "@mui/material";
import { toast } from "react-toastify";
import { Timestamp } from "firebase/firestore";
import useMovementsList from "../../hooks/useFetchTransactions";
import AddMovement from "./addMovement";
import SkeletonList from "../../components/skeleton/skeletonList";
import {
  postCommitAtHistory,
  postTransaction,
  updateAccountBalance,
} from "../../api/accounts";
import { currencyFormatter } from "../../constants/constants";
import useFetchAccounts from "../../hooks/useFetchAccounts";
import useFetchCommits from "../../hooks/useFetchCommits";
import withSession from "../../components/auth-consumer/withSession";
import TimeFilter from "./timeFilter";
import AccountTabs from "./accountTabs";
import TransactionsHistory from "./transactionsHistory";
import TransactionList from "./transactionsList";

const transactionOperations = {
  withdraw: (accountAmmount, transactionAmmout) =>
    accountAmmount - transactionAmmout,
  income: (accountAmmount, transactionAmmout) =>
    accountAmmount + transactionAmmout,
};

const Account = ({ auth }) => {
  const { uid } = useParams();
  const accounts = useFetchAccounts(auth.data);
  const [accountData, setAccountData] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  const movementsList = useMovementsList({ uid, filterDate });
  // eslint-disable-next-line no-unused-vars
  const commits = useFetchCommits({ uid });

  useEffect(() => {
    if (accounts.data && uid && !accounts.isLoading && !accounts.error) {
      const currentAccount = accounts.data.find(
        (account) => account.uid === uid
      );
      if (currentAccount) {
        setAccountData(currentAccount);
      }
    }
  }, [accounts.data, accounts.isLoading, accounts.error, uid]);

  const [transactionModal, setTransactionModal] = useState(false);
  const submitHandler = async ({ transactionType, description, amount }) => {
    try {
      const updatedAmmount = transactionOperations[transactionType](
        parseFloat(accountData.amount),
        parseFloat(amount)
      );
      if (updatedAmmount >= 0) {
        const newTransaction = {
          transactionType: transactionType,
          description: description,
          amount: amount,
          createdAt: Timestamp.fromDate(new Date()),
        };
        await postTransaction(uid, newTransaction);
        setTransactionModal(false);
        await updateAccountBalance(updatedAmmount, uid);
        await submitCommit(
          newTransaction,
          accountData.amount,
          updatedAmmount,
          uid
        );
      } else {
        toast.error("You don't have enought money for this transaction", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitCommit = async (
    transactionData,
    accountAmount,
    updatedAmmount,
    accountUid
  ) => {
    try {
      const newCommit = {
        transactionData,
        previousAccountAmount: accountAmount,
        updatedAmmount,
      };
      await postCommitAtHistory(accountUid, newCommit);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "1em" }}>
      <AddMovement
        when={transactionModal}
        submitHandler={submitHandler}
        handleCloseEvent={() => setTransactionModal(false)}
      />
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        onClick={() => setTransactionModal(true)}
      >
        Register Transaction
      </Button>
      <TimeFilter onFilterChange={setFilterDate} />
      {accountData && filterDate ? (
        <>
          <Typography variant="h4" gutterBottom component="div">
            Account balance: {currencyFormatter.format(accountData.amount)}
          </Typography>
          <AccountTabs
            transactionsHistory={<TransactionsHistory transactions={commits} />}
            transactionsList={<TransactionList movements={movementsList} />}
          />
        </>
      ) : (
        <SkeletonList />
      )}
    </Container>
  );
};

export default withSession(Account);
