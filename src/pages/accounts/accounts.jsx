/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Container, Button, Alert, AlertTitle } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import AccountsList from "./accountsList";
import CreateAccount from "./createAccount";
import withSession from "../../components/auth-consumer/withSession";
import { postAccount } from "../../api/accounts";
import useFetchAccounts from "../../hooks/useFetchAccounts";
import SkeletonList from "../../components/skeleton/skeletonList";
import EmptyAlert from "../../components/alerts/empty";
import AccountBalance from "./accountBalance";

const Accounts = ({ ...props }) => {
  const { auth } = props;
  const { data, isLoading, error } = useFetchAccounts(auth.data);
  const [createAccountModal, setCreateAccountModal] = useState(false);
  const submitHandler = async (values) => {
    try {
      const newAccount = {
        title: values.title,
        description: values.description,
        amount: values.amount,
        owner: auth.data.uid,
        createdAt: Timestamp.fromDate(new Date()),
      };
      await postAccount(newAccount);
      setCreateAccountModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container maxWidth="sm" sx={{ marginTop: "1em" }}>
      <CreateAccount
        when={createAccountModal}
        submitHandler={submitHandler}
        handleCloseEvent={() => {
          setCreateAccountModal(false);
        }}
      />
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        onClick={() => setCreateAccountModal(true)}
      >
        New account
      </Button>
      {data && data.length >= 0 && (
        <>
          <AccountBalance accounts={data} />
          <AccountsList accounts={data} />
        </>
      )}
      {
        data && data.length === 0 && (<EmptyAlert content="No Accounts to display"/>)
      }
      {isLoading && !error && <SkeletonList />}
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>{error}!</strong>
        </Alert>
      )}
    </Container>
  );
};
export default withSession(Accounts);
