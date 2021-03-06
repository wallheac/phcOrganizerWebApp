import React, { useState, useEffect } from 'react'
import { List, fromJS } from 'immutable'
import { Grid, Paper, Typography, Button, TextField } from '@material-ui/core'
import Panel from './panel'
import Filters from '../filters'
import { InsertDriveFile, Done, Clear } from '@material-ui/icons'

const PanelAssignmentMain = () => {
  const [papers, setPapers] = useState(null)
  const [panelText, setPanelText] = useState(null)
  const [panels, setPanels] = useState(fromJS([]))
  const [hoveredPanel, setHoveredPanel] = useState(null)
  const [showAccepted, setShowAccepted] = useState(true)
  const [showRejected, setShowRejected] = useState(true)

  const getPapers = async () => {
    const papers = await fetch('http://localhost:3001/organizer/papers?unassigned=true')
      .then(response => response.json())
    setPapers(fromJS(papers.content))
  }

  useEffect(() => {
    getPapers()
  }, [])

  const savePanel = async (panel) => {
    fetch('http://localhost:3001/organizer/constructedpanel', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        panel.toJS()
      )
    }).then(removePanelFromUnsavedPanels(panel))
      .catch(error => console.log(error))
  }

  const savePaper = async (paper) => {
    const id = paper.getIn(['paperId'])
    fetch(`http://localhost:3001/organizer/paper/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        paper.toJS()
      )
    }).catch(error => console.log(error))
  }

  const onPanelTextEntry = (event) => {
    setPanelText(event.target.value)
  }

  const handleCreateClick = (event) => {
    event.preventDefault()
    const panelCopy = fromJS(panels)
    const newPanels = panelCopy.push(fromJS({ title: panelText }))
    setPanels(newPanels)
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

  const removePanelFromUnsavedPanels = (savedPanel) => {
    const unsavedPanels = panels.filter(panel => panel.getIn(['title']) !== savedPanel.getIn(['title']))
    setPanels(unsavedPanels)
  }

  const addPaperToPanel = (paperId, panel) => {
    const assignedPaper = papers.find(paper => paper.getIn(['paperId']).toString() === paperId)
    const desiredPanel = panels.find(panelCopy => panelCopy.getIn(['title']) === panel.getIn(['title']))
    const panelIndex = panels.indexOf(desiredPanel)

    const withNewPaper = desiredPanel.getIn(['papers'])
      ? desiredPanel.updateIn(['papers'], list => list.push(assignedPaper))
      : desiredPanel.setIn(['papers'], List.of(assignedPaper))
    setPanels(panels.setIn([panelIndex.toString()], withNewPaper))
  }

  const handleEditSubmit = (oldTitle, newTitle, papers) => {
    const panelIndex = panels.findIndex(panel => panel.getIn(['title']) === oldTitle)
    const panelWithUpdatedTitle = [...panels][panelIndex].updateIn(['title'], () => newTitle)
    const panelNewPapers = panelWithUpdatedTitle.updateIn(['papers'], () => papers)
    setPanels(panels.updateIn([panelIndex.toString()], () => panelNewPapers))
  }

  const handleFileClick = abstractUrl => event => {
    event.preventDefault()
    window.open(abstractUrl, '_blank')
  }

  const handlePanelSave = (panelTitle) => {
    const panel = panels.find(panel => panel.getIn(['title']) === panelTitle)
    console.log('in save', panel.toJS())
    savePanel(panel)
  }

  const handleAccept = (paperId) => {
    setAccepted(paperId, true)
  }

  const handleReject = (paperId) => {
    setAccepted(paperId, false)
  }

  const setAccepted = (paperId, value) => {
    const originalPaper = papers.find(paper => paper.getIn(['paperId']) === paperId)
    if (value !== originalPaper.getIn(['accepted'])) {
      const updatedPaper = originalPaper.updateIn(['accepted'], () => value)
      const paperIndex = papers.findIndex(paper => paper.getIn(['paperId']) === paperId)
      setPapers(papers.setIn([paperIndex.toString()], updatedPaper))
      savePaper(updatedPaper)
    }
  }

  const handleToggleShowAcceptance = (checkboxId, value) => {
    if (checkboxId === 'Accepted') {
      setShowAccepted(!showAccepted)
    } else {
      setShowRejected(!showRejected)
    }
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
        <Filters
          showAccepted={showAccepted}
          showRejected={showRejected}
          onShowAcceptanceToggle={handleToggleShowAcceptance}
        />
        <Paper>
          {
            (showAccepted || showRejected) && papers && papers
              .filter(paper => (paper.getIn(['accepted']) === showAccepted || paper.getIn(['accepted']) !== showRejected))
              .map(paper =>
                <div key={paper.getIn(['paperId'])}
                  paperid={paper.getIn(['paperId'])}
                  draggable
                  onDragStart={event => onDragStart(event)}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span>{`${paper.getIn(['participant', 'firstName'])} ${paper.getIn(['participant', 'lastName'])}: ${paper.getIn(['title'])}`}</span>
                  <div style={{ display: 'inline-flex' }}>
                    <Done
                      style={paper.getIn(['accepted']) ? styles.accepted : { color: 'green' }}
                      onClick={event => handleAccept(paper.getIn(['paperId']))} />
                    <Clear style={paper.getIn(['accepted']) ? { color: 'red' } : styles.rejected }
                      onClick={event => handleReject(paper.getIn(['paperId']))}/>
                    <InsertDriveFile
                      onClick={handleFileClick(paper.getIn(['abstractUrl']))}
                      style={{ color: 'darkgray', display: 'inline', padding: '3px' }}/>
                  </div>
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
              return <Panel
                key={idx}
                onDrop={onDrop}
                onDragEnter={onDragEnter}
                hoveredPanel={hoveredPanel}
                onSubmit={handleEditSubmit}
                panel={panel}
                onFileClick={handleFileClick}
                onSave={handlePanelSave}
              />
            })
          }
        </Paper>
      </Grid>
    </Grid>
  </>
}

export default PanelAssignmentMain

const styles = {
  accepted: { color: 'green', backgroundColor: 'lightgreen', borderRadius: '50%' },
  rejected: { color: 'red', backgroundColor: 'pink', borderRadius: '50%' }
}
