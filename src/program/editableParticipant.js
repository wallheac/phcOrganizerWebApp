import React from 'react'
import PropTypes from 'prop-types'
import { Input, InputLabel } from '@material-ui/core'

const EditableParticipant = (props) => {
  const handleEdit = name => event => {
    event.preventDefault()
    props.onParticipantEdit(name, event.target.value, props.participant.getIn(['participantId']))
  }

  return <div style={{ paddingTop: '40px' }}>
    <div style={{ paddingTop: '10px', display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <InputLabel >First Name</InputLabel>
        <Input
          multiline
          fullWidth
          onChange={handleEdit('firstName')}
          value={props.participant.getIn(['firstName'])}>
          {props.participant.getIn(['firstName'])}
        </Input>
      </div>
      <div style={{ paddingLeft: '10px', width: '50%' }}>
        <InputLabel>Last Name</InputLabel>
        <Input
          multiline
          fullWidth
          onChange={handleEdit('lastName')}
          value={props.participant.getIn(['lastName'])}>
          {props.participant.getIn(['lastName'])}
        </Input>
      </div>
    </div>
    <div style={{ paddingTop: '10px', display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <InputLabel>Status</InputLabel>
        <Input
          multiline
          fullWidth
          onChange={handleEdit('status')}
          value={props.participant.getIn(['status'])}>
          {props.participant.getIn(['status'])}
        </Input>
      </div>
      <div style={{ paddingLeft: '10px', width: '50%' }}>
        <InputLabel>Institution</InputLabel>
        <Input
          multiline
          fullWidth
          onChange={handleEdit('institution')}
          value={props.participant.getIn(['institution'])}>
          {props.participant.getIn(['institution'])}
        </Input>
      </div>
    </div>

    <InputLabel style={{ paddingTop: '10px' }}>Email</InputLabel>
    <Input
      multiline
      onChange={handleEdit('email')}
      value={props.participant.getIn(['email'])}>
      {props.participant.getIn(['email'])}
    </Input>

    <InputLabel style={{ paddingTop: '10px' }}>Paper Title</InputLabel>
    <Input
      multiline
      fullWidth
      onChange={handleEdit('title')}
      value={props.participant.getIn(['paper', 'title'])}>
      {props.participant.getIn(['paper', 'title'])}
    </Input>
  </div>
}

export default EditableParticipant

EditableParticipant.propTypes = {
  participant: PropTypes.object.isRequired,
  onParticipantEdit: PropTypes.func.isRequired
}
