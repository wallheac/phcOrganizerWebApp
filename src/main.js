import React, {useState} from 'react';
import {Typography} from '@material-ui/core';
import OrganizerTabs from './organizerTabs';
import './App.css';

const Main = () => {
  const calculateSelectedTab = () => {
    return window.location.pathname === "/program" ? 1 : 0;
  }
  const [selectedTab, setSelectedTab] = useState(calculateSelectedTab);
  
    return (
      <>
      <OrganizerTabs
        selectedTab={selectedTab}
        handleTabChange={setSelectedTab}
      />
      </>
    );
}

export default Main;