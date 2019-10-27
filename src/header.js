import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, Tab, AppBar } from '@material-ui/core'
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom'
import PanelAssignmentMain from './panelAssignment/panelAssignmentMain'
import ProgramMain from './program/programMain'

const Header = ({ selectedTab, handleTabChange }) => {
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
          <Route path="/program" component={ProgramMain} />
          <Route path="/" component={PanelAssignmentMain} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

Header.propTypes = {
  handleTabChange: PropTypes.func.isRequired,
  selectedTab: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired
}

export default Header
