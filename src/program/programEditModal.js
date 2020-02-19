import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input, InputLabel, Button, Modal, Paper } from '@material-ui/core'
import EditableParticipant from './editableParticipant'

const ProgramEditModal = (props) => {
  const [panel, setPanel] = useState(props.panel)
  const [participants, setParticipants] = useState(props.panel.getIn(['participants']))

  useEffect(() => {
    const participantsCopy = props.panel.getIn(['participants'])
    setParticipants(participantsCopy)
  }, [props])

  const handleClose = () => {
    props.onClose(false)
  }

  const handlePanelFieldEdit = field => event => {
    event.preventDefault()
    setPanel(panel.updateIn([field], () => event.target.value))
  }

  const handleParticipantEdit = (name, value, participantId) => {
    const participantIndex = participants
      .findIndex(currentParticipant => currentParticipant.getIn(['participantId']) === participantId)
    const changedParticipant = participants.getIn([participantIndex.toString()])
    let newParticipant
    if (name === 'title') {
      newParticipant = changedParticipant.updateIn(['paper', 'title'], () => value)
    } else {
      newParticipant = changedParticipant.updateIn([name], () => value)
    }
    const newParticipantList = participants.splice(participantIndex, 1, newParticipant)
    setParticipants(newParticipantList)
  }

  // TODO - change to handle full panel, not just panelName
  const handleSubmit = () => {
    props.onClose(false)
    props.onSubmit(panel.getIn(['panelId']), panel.getIn(['panelName']), participants)
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
            onChange={handlePanelFieldEdit('panelName')}
            value={panel.getIn(['panelName'])}
          >
            {panel.getIn(['panelName'])}
          </Input>
          <InputLabel style={{ paddingTop: '3px' }}>Panel Notes</InputLabel>
          <Input
            style={{ paddingBottom: '3px' }}
            multiline
            fullWidth
            onChange={handlePanelFieldEdit('notes')}
            value={panel.getIn(['notes'])}
          >
            {panel.getIn(['notes'])}
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
