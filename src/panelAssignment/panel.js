import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import { Paper, Modal, Input, InputLabel, Button } from '@material-ui/core'
import { Save, Edit } from '@material-ui/icons'
import ConfPaper from './paper'

const Panel = (props) => {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(props.panel.title)
  const [papers, setPapers] = useState([])

  useEffect(() => {
    const papersCopy = List(props.panel.papers)
    setPapers(papersCopy)
  }, [props])

  const handleEdit = () => {
    setEditing(true)
  }

  const handleClose = () => {
    setEditing(false)
  }

  const handleTitleEdit = (event) => {
    setTitle(event.target.value)
  }

  const handlePaperEdit = (name, value, paperId) => {
    const currentPapers = papers
    const paperIndex = currentPapers.findIndex(currentPaper => currentPaper.getIn(['paperId']) === paperId)
    const changedPaper = currentPapers.getIn([paperIndex.toString()])
    let newPaper
    if (name === 'title') {
      newPaper = changedPaper.updateIn(['title'], value)
    } else {
      newPaper = changedPaper.updateIn(['participant', name], () => value)
    }
    const newPaperList = currentPapers.splice(paperIndex, 1, newPaper)
    setPapers(newPaperList)
  }

  return <div
    style={props.hoveredPanel === title ? styles.panelHover : styles.panelItem}
    onDragEnter={event => props.onDragEnter(event)}
    onDragOver={event => event.preventDefault()}
    onDrop={event => props.onDrop(event, props.panel)}
  >
    {props.panel.title}
    <div style={{ display: 'inline', float: 'right', padding: '3px' }}>
      <Edit style={{ color: 'darkgray' }} onClick={handleEdit}/>
      <Save style={{ color: 'darkgray' }}/>
    </div>
    <div>
      {
        props.panel.papers && props.panel.papers.map(paper =>
          <div key={paper.getIn(['paperId'])} style={{ fontWeight: '400', fontSize: '0.8em', paddingLeft: '1em' }}>
            {`${paper.getIn(['participant', 'firstName'])} ${paper.getIn(['participant', 'lastName'])}: ${paper.getIn(['title'])}`}
          </div>)
      }
    </div>
    {
      editing &&
    <Modal
      style={{ width: '40vw', left: '30vw', top: '10vh', maxHeight: '80%' }}
      open={editing}
      onClose={handleClose}
    >
      <div>
        <Paper style={{ padding: '10px' }}>
          <div style={{ overflowY: 'scroll', maxHeight: '65vh' }}>
            <InputLabel style={{ paddingTop: '3px' }}>Panel Title</InputLabel>
            <Input
              style={{ paddingBottom: '3px' }}
              multiline
              fullWidth
              onChange={handleTitleEdit}
              value={title}
            >
              {title}
            </Input>
            {
              papers && papers.map(paper =>
                <div key={paper.getIn(['paperId'])}><ConfPaper
                  paper={paper}
                  onPaperEdit={handlePaperEdit}
                />
                </div>
              )
            }
          </div>
          <div style={{ paddingTop: '10px' }}>
            <Button
              variant="contained"
              color="primary">
            Submit
            </Button>
          </div>
        </Paper>

      </div>
    </Modal>
    }
  </div>
}

const styles = {
  panelHover: { backgroundColor: '#DCDCDC', fontWeight: 'bold', fontSize: '1.3em', padding: '3px' },
  panelItem: { backgroundColor: 'white', fontWeight: 'bold', fontSize: '1.1em', padding: '3px' }
}

Panel.propTypes = {
  onDrop: PropTypes.func.isRequired,
  onDragEnter: PropTypes.func.isRequired,
  hoveredPanel: PropTypes.string,
  panel: PropTypes.object.isRequired
}

export default Panel
