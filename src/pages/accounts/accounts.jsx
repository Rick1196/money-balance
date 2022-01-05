/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Container, Button } from "@mui/material";
import AccountsList from "./accountsList";
import CreateAccount from "./createAccount";
import withSession from "../../components/auth-consumer/withSession";
import { postAccount } from "../../api/accounts";
import useFetchAccounts from "../../hooks/useFetchAccounts";
import SkeletonList from "../../components/skeleton/skeletonList";

const Accounts = ({ ...props }) => {
  const { auth } = props;
  const accounts = useFetchAccounts(auth);
  const [createAccountModal, setCreateAccountModal] = useState(false);

  const submitHandler = async (values) => {
    try {
      const newAccount = {
        title: values.title,
        description: values.description,
        amount: values.amount,
        owner: auth.uid,
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
      {accounts ? <AccountsList accounts={accounts} /> : <SkeletonList />}
    </Container>
  );
};
export default withSession(Accounts);
