import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import ModalContainer from "../../components/modal-container/modalContainer";
import { currencyFormatter } from "../../constants";
import ExpensesList from "./expensesList";
import useFetchExpenses from "../../hooks/useFetchExpenses";
import { postTransactionExpenses } from "../../api/accounts";
import { toast } from "react-toastify";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const TransactionDetail = ({
  accountUid,
  transactionData,
  when,
  handleClose,
}) => {
  const expensesState = useFetchExpenses(accountUid, transactionData?.uid);
  const handleSubmitExpense = async (expenseDescription, setSubmitting) => {
    try {
      const newExpense = {
        description: expenseDescription,
        createdAt: Timestamp.fromDate(new Date()),
      };
      await postTransactionExpenses(
        accountUid,
        transactionData.uid,
        newExpense
      );
      toast.success("Expense added successfully");
      setSubmitting();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ModalContainer
      customStyle={modalStyle}
      when={when}
      handleCloseEvent={handleClose}
    >
      <div>
        <h1>Transaction Detail</h1>
        <p>
          <strong>Transaction type:</strong>
          {String(transactionData?.transactionType).toLocaleUpperCase()}
        </p>
        <p>
          <strong>Transaction date: </strong>
          {format(transactionData?.createdAt?.toDate() || new Date(), "Pp")}
        </p>
        <article>{transactionData?.description}</article>
        <p>
          <strong>Transaction amount: </strong>
          {currencyFormatter.format(transactionData?.amount || 0)}
        </p>
        {expensesState.isLoading === true && <p>Loading...</p>}
        {expensesState.isLoading === false && (
          <>
            <p>Expenses</p>
            <ExpensesList
              expenses={expensesState.data}
              onCreateExpense={handleSubmitExpense}
            />
          </>
        )}
      </div>
    </ModalContainer>
  );
};

TransactionDetail.propTypes = {
  accountUid: PropTypes.string.isRequired,
  transactionData: PropTypes.object,
  when: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default TransactionDetail;
