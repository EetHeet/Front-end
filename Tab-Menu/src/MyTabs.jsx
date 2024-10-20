import React, { useState } from "react";
import { Tab, Tabs, } from "@mui/material";
import TodoList from "./Todolist";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function MyTabs() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };

  const tabTitles = ["Welcome", "My Todos"];

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">
            {tabTitles[currentTabIndex]}
          </Typography>
          <Tabs value={currentTabIndex} onChange={handleTabChange} textColor="inherit">
            <Tab label="Home" />
            <Tab label="Todo List" />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container>
        {currentTabIndex === 0 && <p>Home</p>}
        {currentTabIndex === 1 && <TodoList />}
      </Container>
    </>
  );
}

export default MyTabs;