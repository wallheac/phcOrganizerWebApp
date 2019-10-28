import React, { useState } from 'react'
import ProgramTable from './programTable'

const ProgramMain = (theme) => {
  const getPanels = async () => {
    const panels = await fetch('http://localhost:3001/organizer/panels')
      .then(response => response.json())
    setPanels(panels.content)
  }

  const [panels, setPanels] = useState(null)

  getPanels()

  return <>{
    panels
      ? <ProgramTable
        panels={panels}
      />
      : 'please wait'
  }</>
}

export default ProgramMain
