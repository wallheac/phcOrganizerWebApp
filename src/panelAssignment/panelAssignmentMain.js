import React, { useState, useEffect } from 'react'
import { List, Map, fromJS } from 'immutable'
import { Grid, Paper, Typography, Button, TextField, Modal, FormControl, Input, InputLabel } from '@material-ui/core'
import Panel from './panel'
import { InsertDriveFile } from '@material-ui/icons'

const PanelAssignmentMain = (theme) => {
  const getPapers = async () => {
    const papers = await fetch('http://localhost:3001/organizer/papers?unassigned=true')
      .then(response => response.json())
    setPapers(fromJS(papers.content))
  }

  useEffect(() => {
    getPapers()
  }, [])

  const [papers, setPapers] = useState(null)
  const [panelText, setPanelText] = useState(null)
  const [panels, setPanels] = useState(List())
  const [hoveredPanel, setHoveredPanel] = useState(null)

  const onPanelTextEntry = (event) => {
    setPanelText(event.target.value)
  }

  const handleCreateClick = (event) => {
    event.preventDefault()
    const panelCopy = [...panels]
    panelCopy.push({ title: panelText })
    setPanels(panelCopy)
    setPanelText('')
  }

  const onDragStart = (event) => {
    event.dataTransfer.setData('text/html', event.target.attributes.paperid.nodeValue)
    event.dataTransfer.effectAllowed = 'move'
  }

  const onDragEnter = (event) => {
    event.dataTransfer.dropEffect = 'move'
    const hoveredPanelName = event.target.childNodes[0].nodeValue
    setHoveredPanel(hoveredPanelName)
  }

  const onDrop = (event, panel) => {
    const paperId = event.dataTransfer.getData('text/html')
    removePaperFromUnassignedPapers(paperId)
    addPaperToPanel(paperId, panel)
    setHoveredPanel(null)
    event.preventDefault()
  }

  const removePaperFromUnassignedPapers = (paperId) => {
    const unassignedPapers = papers.filter(paper => !(paper.getIn(['paperId']).toString() === paperId))
    setPapers(unassignedPapers)
  }

  const addPaperToPanel = (paperId, panel) => {
    const assignedPaper = papers.find(paper => paper.getIn(['paperId']).toString() === paperId)
    const panelsCopy = panels
    const newPanel = panelsCopy.find(panelCopy => panelCopy.title === panel.title)
    const panelIndex = panelsCopy.indexOf(newPanel)
    newPanel.papers ? newPanel.papers.push(assignedPaper) : newPanel.papers = [assignedPaper]
    panelsCopy[panelIndex] = newPanel
    setPanels(panelsCopy)
  }

  return <>
    <Grid container spacing={2} style={{ padding: '10px' }}>
      <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          margin="normal"
          variant="outlined"
          style={{ paddingRight: '1em', minWidth: '400px' }}
          onChange={onPanelTextEntry}
        >
          {panelText}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateClick}>
              Create Panel
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5" style={{ paddingBottom: '1em' }}>Unassigned Papers</Typography>
        <Paper>
          {
            papers && papers.map(paper =>
              <div key={paper.getIn(['paperId'])}
                paperid={paper.getIn(['paperId'])}
                draggable
                onDragStart={event => onDragStart(event)}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <span>{`${paper.getIn(['participant', 'firstName'])} ${paper.getIn(['participant', 'lastName'])}: ${paper.getIn(['title'])}`}</span>
                <InsertDriveFile style={{ color: 'darkgray', display: 'inline', padding: '3px' }}/>
              </div>
            )
          }
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5" style={{ paddingBottom: '1em' }}>Available Panels</Typography>
        <Paper>
          {
            panels && panels.map((panel, idx) => {
              console.log(panel)
              return <Panel
                key={idx}
                onDrop={onDrop}
                onDragEnter={onDragEnter}
                hoveredPanel={hoveredPanel}
                panel={panel}
              />
            })
          }
        </Paper>
      </Grid>
    </Grid>
  </>
}



export default PanelAssignmentMain
