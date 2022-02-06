import React, { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { PropTypes } from "prop-types";
import Style from "./modal.style";

const ModalContainer = ({ when, children, handleCloseEvent }) => {
  const [open, setOpen] = useState(when);

  useEffect(() => {
    setOpen(when);
  }, [when]);

  const handleClose = () => {
    setOpen(false);
    handleCloseEvent();
  };

  return when ? (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={Style}>{children}</Box>
    </Modal>
  ) : null;
};

ModalContainer.propTypes = {
  when: PropTypes.bool,
  children: PropTypes.node,
  handleCloseEvent: PropTypes.func,
};

export default ModalContainer;
