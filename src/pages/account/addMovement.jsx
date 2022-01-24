import React from "react";
import { Formik } from "formik";
import { PropTypes } from "prop-types";
import {
  TextField,
  Input,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import {
  CustomForm,
  FullButton,
  FormTitle,
  CustomFormControl,
} from "../../components/form/form";
import ModalContainer from "../../components/modal-container/modalContainer";
import { transactions, validationsRegex } from "../../constants";

const AddMovement = ({ when, submitHandler, handleCloseEvent }) => {
  return (
    <ModalContainer when={when} handleCloseEvent={handleCloseEvent}>
      <Formik
        initialValues={{
          amount: "",
          description: "",
          transactionType: transactions.WITHDRAW,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.description) {
            errors.title = "Required";
          }
          if (values.amount === null || values.amount === undefined) {
            errors.amount = "Required";
          } else if (!String(values.amount).match(validationsRegex.number)) {
            errors.amount = "Thsi field must be a number";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          submitHandler(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <CustomForm onSubmit={handleSubmit}>
            <FormTitle>Transaction</FormTitle>
            <CustomFormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Transaction type
              </InputLabel>
              <Select
                value={values.transactionType}
                labelId="demo-simple-select-label"
                name="transactionType"
                label="Transaction Type"
                onChange={handleChange}
              >
                <MenuItem value={transactions.INCOME}>Income</MenuItem>
                <MenuItem value={transactions.WITHDRAW}>Withdraw</MenuItem>
              </Select>
            </CustomFormControl>
            {errors.amount && touched.amount && errors.amount}
            <CustomFormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Amount
              </InputLabel>
              <Input
                name="amount"
                id="standard-adornment-amount"
                value={values.amount}
                onChange={handleChange}
                placeholder="0.00"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                onBlur={handleBlur}
              />
            </CustomFormControl>
            {errors.amount && touched.amount && errors.amount}
            <TextField
              fullWidth
              type="text"
              label="Why is this transaction being doing?"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              variant="standard"
              multiline
              rows={4}
            />
            {errors.description && touched.description && errors.description}
            <div>
              <FullButton
                variant="outlined"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </FullButton>
            </div>
          </CustomForm>
        )}
      </Formik>
    </ModalContainer>
  );
};
AddMovement.propTypes = {
  when: PropTypes.bool,
  submitHandler: PropTypes.func,
  handleCloseEvent: PropTypes.func,
};
export default AddMovement;
