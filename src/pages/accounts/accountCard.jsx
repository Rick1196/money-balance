import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { ClickableCard } from "./accountCard.style";

const AccountCard = ({ account, navigateToAccount }) => {
  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  return (
    <Link to={navigateToAccount}>
      <ClickableCard
        sx={{
          display: "flex",
          marginTop: "1em",
          flexWrap: "nowrap",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {account.description}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {account.description}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {formatAmount(account.amount)}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 100 }}
          image="https://www.cibc.com/content/dam/global-assets/icons/illustrative/grey-circle/currency/money-jar-bill-256x256.svg"
          alt="Live from space album cover"
        />
      </ClickableCard>
    </Link>
  );
};

AccountCard.propTypes = {
  account: PropTypes.object,
  navigateToAccount: PropTypes.string,
};

export default AccountCard;
