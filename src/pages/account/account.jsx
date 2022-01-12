import React, { useState } from "react";
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
import useFetchAccount from "../../hooks/useFetchAccount";
const transactionOperations = {
  withdraw: (accountAmmount, transactionAmmout) =>
    accountAmmount - transactionAmmout,
  income: (accountAmmount, transactionAmmout) =>
    accountAmmount + transactionAmmout,
};

const Account = () => {
  const { uid } = useParams();
  const accountData = useFetchAccount(uid);
  const movementsList = useMovementsList({ uid });
  console.log(movementsList);
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
      {movementsList && accountData ? (
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
            {movementsList.map((movement) => (
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

export default Account;
