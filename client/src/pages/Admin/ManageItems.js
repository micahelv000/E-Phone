import React, { useState } from "react";
import { Container, AppBar, Tabs, Tab, Box } from "@mui/material";
import Header from "../../components/layout/Header";
import CurrentStock from "../../components/ManageItems/CurrentStock";
import AddNewStock from "../../components/ManageItems/AddNewStock";
import Bottom from '../../components/layout/Bottom';
import BottomLongPages from "../../components/layout/BottomLongPages";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function ManageItems() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header />
      <Container>
        <AppBar position="static" style={{ backgroundColor: 'white', color: 'black' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="manage items tabs"
            centered
            TabIndicatorProps={{ style: { backgroundColor: 'black' } }}
          >
            <Tab label="Current Stock" />
            <Tab label="Add New Stock" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <CurrentStock />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddNewStock />
        </TabPanel>
      </Container>
    </div>
  );
}