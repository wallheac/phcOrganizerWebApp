import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input, InputLabel, Button, Modal, Paper } from '@material-ui/core'
import EditableParticipant from './editableParticipant'

const ProgramEditModal = (props) => {
  const [title, setTitle] = useState(props.panel.getIn(['panelName']))
  const [participants, setParticipants] = useState(props.panel.getIn(['participants']))

  useEffect(() => {
    const participantsCopy = props.panel.getIn(['participants'])
    setParticipants(participantsCopy)
    setTitle(props.panel.getIn(['panelName']))
  }, [props])

  const handleClose = () => {
    props.onClose(false)
  }

  const handleTitleEdit = (event) => {
    setTitle(event.target.value)
  }

  // TODO change this to handle participants
  const handleParticipantEdit = (name, value, participantId) => {
    const currentParticipants = participants
    const participantIndex = currentParticipants
      .findIndex(currentParticipant => currentParticipant.getIn(['participantId']) === participantId)
    const changedParticipant = currentParticipants.getIn([participantIndex.toString()])
    let newParticipant
    if (name === 'title') {
      newParticipant = changedParticipant.updateIn(['paper', 'title'], () => value)
    } else {
      newParticipant = changedParticipant.updateIn([name], () => value)
    }
    const newParticipantList = currentParticipants.splice(participantIndex, 1, newParticipant)
    setParticipants(newParticipantList)
  }

  const handleSubmit = () => {
    props.onClose(false)
    props.onSubmit(props.panel.getIn(['panelId']), title, participants)
  }

  return <Modal
    style={{ width: '40vw', left: '30vw', top: '10vh', maxHeight: '80%' }}
    open={props.editing}
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
            participants && participants.map(participant =>
              <div key={participant.getIn(['participantId'])}><EditableParticipant
                participant={participant}
                onParticipantEdit={handleParticipantEdit}
              />
              </div>
            )
          }
        </div>
        <div style={{ paddingTop: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}>
      Submit
          </Button>
        </div>
      </Paper>

    </div>
  </Modal>
}
export default ProgramEditModal

ProgramEditModal.propTypes = {
  panel: PropTypes.object.isRequired,
  editing: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}
