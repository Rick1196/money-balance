import React from "react";
import { ListItem, ListItemText, List } from "@mui/material";
import PropTypes from "prop-types";
import MovementItem from "./movementItem";
import SkeletonList from "../../components/skeleton/skeletonList";
import EmptyAlert from "../../components/alerts/empty";

const TransactionList = ({ movements }) => {
  const { data, isLoading } = movements;
  return (
    <>
      <ListItem key={"transation-header"} disablePadding sx={{ width: "100%" }}>
        <ListItemText id={`date-header`} primary={"Date"} />
        <ListItemText id={`description-header`} primary={"Description"} />
        <ListItemText id={`amount-header`} primary={"Amount"} />
      </ListItem>
      {data && data.length >= 0 && (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {data.map((movement) => (
            <MovementItem
              movement={movement}
              key={`movement-${movement.uid}`}
            />
          ))}
        </List>
      )}
      {data && data.length === 0 && (
        <EmptyAlert content="No Transactions to display" />
      )}
      {isLoading && <SkeletonList />}
    </>
  );
};

TransactionList.propTypes = {
  movements: PropTypes.object.isRequired,
};

export default TransactionList;
