/* eslint-disable react/prop-types */
import React from "react";
import { format } from "date-fns";
import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

const MovementItem = ({ movement, onClick }) => {
  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  return (
    <ListItem key={movement.uid} disablePadding sx={{ width: "100%" }}>
      <ListItemButton onClick={onClick}>
        <ListItemAvatar>{format(new Date(movement.date), "Pp")}</ListItemAvatar>
        <ListItemText
          id={`${movement.uid}-description`}
          primary={movement.description}
        />
        <ListItemText
          id={`${movement.uid}-amount`}
          primary={formatAmount(movement.amount)}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default MovementItem;
