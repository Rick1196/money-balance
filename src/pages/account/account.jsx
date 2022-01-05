import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, List, Button } from "@mui/material";
import { ListItem, ListItemText } from "@mui/material";
import useMovementsList from "../../hooks/useFetchAccount";
import AddMovement from "./addMovement";
import MovementItem from "./movementItem";
import SkeletonList from "../../components/skeleton/skeletonList";
import { postTransaction } from "../../api/accounts";

const Account = () => {
  const { uid } = useParams();
  const movementsList = useMovementsList({ uid });
  console.log(movementsList);
  const [transactionModal, setTransactionModal] = useState(false);
  const submitHandler = async (values) => {
    try {
      const newTransaction = {
        description: values.description,
        amount: values.amount,
        date: new Date().getTime(),
      };
      await postTransaction(uid, newTransaction);
      setTransactionModal(false);
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
      {movementsList ? (
        <>
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
