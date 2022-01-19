/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ListItem,
  ListItemText,
  Typography,
  Container,
  List,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import useMovementsList from "../../hooks/useFetchTransactions";
import AddMovement from "./addMovement";
import MovementItem from "./movementItem";
import SkeletonList from "../../components/skeleton/skeletonList";
import { postTransaction, updateAccountBalance } from "../../api/accounts";
import { currencyFormatter } from "../../constants/constants";
import useFetchAccounts from "../../hooks/useFetchAccounts";
import withSession from "../../components/auth-consumer/withSession";

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
  const movementsList = useMovementsList({ uid });

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
          date: new Date().getTime(),
        };
        await postTransaction(uid, newTransaction);
        setTransactionModal(false);
        await updateAccountBalance(updatedAmmount, uid);
      } else {
        toast.error("You don't have enought money for this transaction", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
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
      {movementsList.data && !movementsList.isLoading && accountData ? (
        <>
          <Typography variant="h4" gutterBottom component="div">
            Account balance: {currencyFormatter.format(accountData.amount)}
          </Typography>
          <ListItem
            key={"transation-header"}
            disablePadding
            sx={{ width: "100%" }}
          >
            <ListItemText id={`date-header`} primary={"Date"} />
            <ListItemText id={`description-header`} primary={"Description"} />
            <ListItemText id={`amount-header`} primary={"Amount"} />
          </ListItem>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {movementsList.data.map((movement) => (
              <MovementItem
                movement={movement}
                key={`movement-${movement.uid}`}
              />
            ))}
          </List>
        </>
      ) : (
        <SkeletonList />
      )}
    </Container>
  );
};

export default withSession(Account);
