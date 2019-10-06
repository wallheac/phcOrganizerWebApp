import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab, AppBar, Paper} from '@material-ui/core';
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";

const OrganizerTabs = ({selectedTab, handleTabChange, path}) => {
    const setTab = (event, value) => {
        handleTabChange(value)
    }
        return (
            <BrowserRouter>
                <div>
                    <AppBar position="static">
                        <Tabs 
                        onChange={setTab}
                        value={selectedTab}
                        >
                            <Tab label="Panel Assignment" component={Link} to="/" />
                            <Tab label = "Program" component={Link} to="/program"/>
                        </Tabs>
                    </AppBar>
                    <Switch>
                        
                        <Route path="/program" component={ItemTwo} />
                        <Route path="/" component={ItemOne} />
                    </Switch>
                </div>
          </BrowserRouter>
        );
}

OrganizerTabs.propTypes = {
    handleTabChange: PropTypes.func.isRequired,
    selectedTab: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired
}

function ItemOne() {
    return (
      <Paper>
        <div>Panel Assignment Test</div>
      </Paper>
    );
  }
  
  function ItemTwo() {
    return (
      <Paper>
        <div>Program Test</div>
      </Paper>
    );
  }

export default OrganizerTabs;