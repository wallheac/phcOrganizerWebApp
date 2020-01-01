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

  return <>{
    panels
      ? <ProgramTable
        panels={panels}
      />
      : 'please wait'
  }</>
}

export default ProgramMain
