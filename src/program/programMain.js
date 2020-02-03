import React, { useState, useEffect } from 'react'
import { fromJS } from 'immutable'
import ProgramTable from './programTable'

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
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        panel.toJS()
      )
    })
      .catch(error => console.log(error))
  }

  const handleSave = (panelId) => {
    const panel = panels.find(panel => panel.getIn(['panelId']) === panelId)
    savePanel(panel)
  }

  return <>{
    panels
      ? <ProgramTable
        panels={panels}
        onEditSubmit={handleEditSubmit}
        onSave={handleSave}
      />
      : 'please wait'
  }</>
}

export default ProgramMain
