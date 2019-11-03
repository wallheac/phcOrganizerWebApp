import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, Tab, AppBar } from '@material-ui/core'
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom'
import PanelAssignmentMain from './panelAssignment/panelAssignmentMain'
import ProgramMain from './program/programMain'
import Sticky from 'react-stickynode'

const Header = ({ selectedTab, handleTabChange }) => {
  const setTab = (event, value) => {
    handleTabChange(value)
  }
  return (
    <BrowserRouter>
      <div>
        <Sticky enabled={true} top={0} >
          <AppBar position="static">
            <Tabs
              onChange={setTab}
              value={selectedTab}
            >
              <Tab label="Panel Assignment" component={Link} to="/" />
              <Tab label = "Program" component={Link} to="/program"/>
            </Tabs>
          </AppBar>
        </Sticky>
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
