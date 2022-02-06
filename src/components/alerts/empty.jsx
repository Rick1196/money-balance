import React from "react";
import Alert from "@mui/material/Alert";
import { PropTypes } from "prop-types";

const EmptyAlert = ({ content = "" }) => {
  return <Alert severity="warning">{content}</Alert>;
};

EmptyAlert.propTypes = {
  content: PropTypes.string,
};
export default EmptyAlert;
