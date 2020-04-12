import React, { useState, useEffect } from 'react'
import { fromJS } from 'immutable'
import ProgramTable from './programTable'
import Filters from '../filters'

const ProgramMain = (theme) => {
  const getPanels = async () => {
    const panels = await fetch('http://localhost:3001/organizer/panels')
      .then(response => response.json())
    setPanels(fromJS(panels.content))
  }

  useEffect(() => {
    getPanels()
  }, [])

  const [panels, setPanels] = useState(null)
  const [showAccepted, setShowAccepted] = useState(true)
  const [showRejected, setShowRejected] = useState(true)

  const handleEditSubmit = (panelId, title, participants) => {
    const panelIndex = panels.findIndex(panel => panel.getIn(['panelId']) === panelId)
    const panel = [...panels][panelIndex]
    const updatedPanel = panel.updateIn(['panelName'], () => title).updateIn(['participants'], () => participants)
    setPanels(panels.updateIn([panelIndex.toString()], () => updatedPanel))
  }

  const savePanel = async (panel) => {
    fetch('http://localhost:3001/organizer/panel', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        panel.toJS()
      )
    })
      .catch(error => console.log(error))
  }

  const handleSave = (panelId, changedPanelValues) => {
    let changedPanel = panels.find(panel => panel.getIn(['panelId']) === panelId)
    if (changedPanelValues) {
      Object.entries(changedPanelValues).forEach(([key, value]) => {
        changedPanel = changedPanel.updateIn([key.toString()], () => value)
      })
    }
    savePanel(changedPanel)
  }

  const setAccepted = (panelId, value) => {
    const originalPanel = panels.find(panel => panel.getIn(['panelId']) === panelId)
    const updatedPanel = originalPanel.updateIn(['accepted'], () => value)
    const panelIndex = panels.findIndex(panel => panel.getIn(['panelId']) === panelId)
    setPanels(panels.setIn([panelIndex.toString()], updatedPanel))
    savePanel(updatedPanel)
  }

  const setTimeSlot = (panelId, time) => {
    const originalPanel = panels.find(panel => panel.getIn(['panelId']) === panelId)
    const updatedPanel = originalPanel.updateIn(['dateTime'], () => time)
    const panelIndex = panels.findIndex(panel => panel.getIn(['panelId']) === panelId)
    setPanels(panels.setIn([panelIndex.toString()], updatedPanel))
    savePanel(updatedPanel)
  }

  const handleToggleShowAcceptance = (checkboxId, value) => {
    if (checkboxId === 'Accepted') {
      setShowAccepted(!showAccepted)
    } else {
      setShowRejected(!showRejected)
    }
  }

  return <>
    <Filters
      showAccepted={showAccepted}
      showRejected={showRejected}
      onShowAcceptanceToggle={handleToggleShowAcceptance}
    />
    {
      panels
        ? <ProgramTable
          panels={panels}
          onEditSubmit={handleEditSubmit}
          onTimeSlotChange={setTimeSlot}
          onToggleAccepted={setAccepted}
          showAccepted={showAccepted}
          showRejected={showRejected}
          onSave={handleSave}
        />
        : 'please wait'
    }</>
}

export default ProgramMain
