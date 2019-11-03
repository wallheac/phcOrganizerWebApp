import React, { useState, useEffect } from 'react'
import { Grid, Paper, Typography, Button, TextField } from '@material-ui/core'

const PanelAssignmentMain = (theme) => {
  const getPapers = async () => {
    const papers = await fetch('http://localhost:3001/organizer/papers?unassigned=true')
      .then(response => response.json())
    setPapers(papers.content)
  }

  useEffect(() => {
    getPapers()
  }, [])

  const [papers, setPapers] = useState(null)
  const [panelText, setPanelText] = useState(null)
  const [panels, setPanels] = useState([])
  const [hoveredPanel, setHoveredPanel] = useState(null)

  const onPanelTextEntry = (event) => {
    setPanelText(event.target.value)
  }

  const handleCreateClick = (event) => {
    event.preventDefault()
    const panelCopy = [...panels]
    panelCopy.push({ title: panelText })
    setPanels(panelCopy)
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
    const unassignedPapers = papers.filter(paper => !(paper.paperId.toString() === paperId))
    setPapers(unassignedPapers)
  }

  const addPaperToPanel = (paperId, panel) => {
    const assignedPaper = papers.find(paper => paper.paperId.toString() === paperId)
    const panelsCopy = [...panels]
    const newPanel = panelsCopy.find(panelCopy => panelCopy.title === panel.title)
    const panelIndex = panelsCopy.indexOf(newPanel)
    newPanel.papers ? newPanel.papers.push(assignedPaper) : newPanel.papers = [assignedPaper]
    panelsCopy[panelIndex] = newPanel
    setPanels(panelsCopy)
  }

  return <>
    <Grid container spacing={2} style={{ padding: '10px' }}>
      <Grid item xs={6}>
        <Typography variant="h5">Unassigned Papers</Typography>
        <Paper>
          {
            papers && papers.map(paper =>
              <div key={paper.paperId}
                paperid={paper.paperId}
                draggable
                onDragStart={event => onDragStart(event)}
              >
                {`${paper.participant.firstName} ${paper.participant.lastName}: ${paper.title}`}
              </div>
            )
          }
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
        </div>
        <Typography variant="h5">Available Panels</Typography>
        <Paper>
          {
            panels && panels.map(panel => <div
              style={hoveredPanel === panel.title ? { backgroundColor: '#DCDCDC', fontWeight: 'bold' } : { backgroundColor: 'white' }}
              key={panel.title}
              onDragEnter={event => onDragEnter(event)}
              onDragOver={event => event.preventDefault()}
              onDrop={event => onDrop(event, panel)}
            >
              {panel.title}
              {console.log(panel)}
              <div>
                {
                  panel.papers && panel.papers.map(paper => <div key={paper.paperId}>
                    {`${paper.participant.firstName} ${paper.participant.lastName}: ${paper.title}`}
                  </div>)
                }
              </div>
            </div>)
          }
        </Paper>
      </Grid>
    </Grid>
  </>
}

export default PanelAssignmentMain
