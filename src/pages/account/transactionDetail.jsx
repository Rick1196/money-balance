import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import ModalContainer from "../../components/modal-container/modalContainer";
import { currencyFormatter } from "../../constants";

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

const TransactionDetail = ({ transactionData, when, handleClose }) => {
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
      </div>
    </ModalContainer>
  );
};

TransactionDetail.propTypes = {
  transactionData: PropTypes.object,
  when: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default TransactionDetail;
