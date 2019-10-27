import React, { useState } from 'react'
import Header from './header'

const Main = () => {
  const calculateSelectedTab = () => {
    return window.location.pathname === '/program' ? 1 : 0
  }
  const [selectedTab, setSelectedTab] = useState(calculateSelectedTab)

  return (
    <>
      <Header
        selectedTab={selectedTab}
        handleTabChange={setSelectedTab}
      />
    </>
  )
}

export default Main
