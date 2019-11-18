import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Paper, Modal, Input, InputLabel, Button } from '@material-ui/core'
import { Save, Edit } from '@material-ui/icons'
import ConfPaper from './paper'

const Panel = (props) => {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(props.panel.title)

  const handleEdit = () => {
    setEditing(true)
  }

  const handleClose = () => {
    setEditing(false)
  }

  const handleTitleEdit = (event) => {
    setTitle(event.target.value)
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
        props.panel.papers && props.panel.papers.map(paper => <div key={paper.paperId} style={{ fontWeight: '400', fontSize: '0.8em', paddingLeft: '1em' }}>
          {`${paper.participant.firstName} ${paper.participant.lastName}: ${paper.title}`}
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
              props.panel.papers && props.panel.papers.map(paper =>
                <div key={paper.paperId}><ConfPaper
                  paper={paper}
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
