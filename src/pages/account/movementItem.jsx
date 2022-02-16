/* eslint-disable react/prop-types */
import React from "react";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";
import { truncateString } from "../../utils/strings";
import { currencyFormatter } from "../../constants";

const Container = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  width: 100%;
  heght: 100px;
  cursor: pointer;
  &&:hover {
    border-radius: 5px;
    box-shadow: 1px 4px 15px 1px rgba(0, 0, 0, 0.5);
  }
`;

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  height: "100%",
  margin: "1em 0 1em 0",
}));

const MovementItem = ({ movement, handleClick }) => {

  return (
    <Container key={movement.uid} onClick={() => handleClick(movement)}>
      <Item>{format(movement.createdAt.toDate(), "Pp")}</Item>
      <Item id={`${movement.uid}-description`}>
        {truncateString(movement.description, 27)}
      </Item>
      <Item id={`${movement.uid}-amount`}>{currencyFormatter.format(movement.amount)}</Item>
    </Container>
  );
};

export default MovementItem;
