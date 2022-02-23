import React from "react";
import { Formik } from "formik";
import { PropTypes } from "prop-types";
import { CustomForm, CustomFormControl } from "../../components/form/form";

import { Input, InputLabel } from "@mui/material";

const AddExpense = ({ onSubmitHandler }) => {
  return (
    <Formik
      initialValues={{
        description: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.description) {
          errors.title = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        values.description = values.description.trim();
        onSubmitHandler(values.description, () => {
          setSubmitting(false);
          values.description = "";
        });
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
        <CustomForm onSubmit={handleSubmit} autoComplete="off">
          <CustomFormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="new-expense">
              Expense (Enter to submit)
            </InputLabel>
            <Input
              value={values.description}
              labelId="new-expense"
              name="description"
              label="Expense (Enter to submit)"
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </CustomFormControl>
          {errors.description && touched.description && errors.description}
        </CustomForm>
      )}
    </Formik>
  );
};

AddExpense.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
};

export default AddExpense;
