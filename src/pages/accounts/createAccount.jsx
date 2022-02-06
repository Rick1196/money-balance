import React from "react";
import { Formik } from "formik";
import { PropTypes } from "prop-types";
import { TextField, Input, InputLabel, InputAdornment } from "@mui/material";
import {
  CustomForm,
  FullButton,
  FormTitle,
  CustomFormControl,
} from "../../components/form/form";
import ModalContainer from "../../components/modal-container/modalContainer";
import { validationsRegex } from "../../constants";

const CreateAccount = ({ when, submitHandler, handleCloseEvent }) => {
  return (
    <ModalContainer when={when} handleCloseEvent={handleCloseEvent}>
      <Formik
        initialValues={{ title: "", description: "", amount: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Required";
          }
          if (!values.description) {
            errors.description = "Required";
          }
          if (values.amount === null || values.amount === undefined) {
            errors.amount = "Required";
          }else if(!String(values.amount).match(validationsRegex.number)){
            errors.amount = 'Thsi field must be a number';
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
            <FormTitle>Create new Account</FormTitle>
            <TextField
              fullWidth
              type="text"
              name="title"
              label="Account Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              variant="standard"
            />
            {errors.title && touched.title && errors.title}
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
              label="Account Description"
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
CreateAccount.propTypes = {
  when: PropTypes.bool,
  submitHandler: PropTypes.func,
  handleCloseEvent: PropTypes.func,
};
export default CreateAccount;
