import React from "react";
import PropTypes from "prop-types";
import AddExpense from "./addExpense";
const ExpensesList = ({ expenses, onCreateExpense }) => {
  return (
    <div>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.uid}>{expense.description}</li>
        ))}
      </ul>
      <AddExpense onSubmitHandler={onCreateExpense} />
    </div>
  );
};

ExpensesList.propTypes = {
  expenses: PropTypes.array.isRequired,
  onCreateExpense: PropTypes.func.isRequired,
};

export default ExpensesList;
