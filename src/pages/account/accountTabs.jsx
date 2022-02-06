import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import TabPanel, { a11yProps } from "../../components/tabs/tabPanel";

const tabs = ["Transactions", "Time Line"];

const AccountTabs = ({ transactionsList, transactionsHistory }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", alignItems: "center" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab label={tab} {...a11yProps(index)} key={`tab-${index}`} />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} key={`tab-panel-${0}`}>
        {transactionsList}
      </TabPanel>
      <TabPanel value={value} index={1} key={`tab-panel-${1}`}>
        {transactionsHistory}
      </TabPanel>
    </Box>
  );
};

AccountTabs.propTypes = {
  transactionsList: PropTypes.node.isRequired,
  transactionsHistory: PropTypes.node.isRequired,
};

export default AccountTabs;
