import React from 'react'
import PropTypes from 'prop-types'
import { Input, InputLabel } from '@material-ui/core'

const ConfPaper = (props) => {

  const handleEdit = name => event => {
    event.preventDefault()
    props.onPaperEdit(name, event.target.value, props.paper.getIn(['paperId']))
  }

  return <div style={{ paddingTop: '40px' }}>
    <div style={{ paddingTop: '10px', display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <InputLabel >First Name</InputLabel>
        <Input
          multiline
          fullWidth
          onChange={handleEdit('firstName')}
          value={props.paper.getIn(['participant', 'firstName'])}>
          {props.paper.getIn(['participant', 'firstName'])}
        </Input>
      </div>
      <div style={{ paddingLeft: '10px', width: '50%' }}>
        <InputLabel>Last Name</InputLabel>
        <Input
          multiline
          fullWidth
          onChange={handleEdit('lastName')}
          value={props.paper.getIn(['participant', 'lastName'])}>
          {props.paper.getIn(['participant', 'lastName'])}
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
          value={props.paper.getIn(['participant', 'status'])}>
          {props.paper.getIn(['participant', 'status'])}
        </Input>
      </div>
      <div style={{ paddingLeft: '10px', width: '50%' }}>
        <InputLabel>Institution</InputLabel>
        <Input
          multiline
          fullWidth
          onChange={handleEdit('institution')}
          value={props.paper.getIn(['participant', 'institution'])}>
          {props.paper.getIn(['participant', 'institution'])}
        </Input>
      </div>
    </div>

    <InputLabel style={{ paddingTop: '10px' }}>Email</InputLabel>
    <Input
      multiline
      onChange={handleEdit('email')}
      value={props.paper.getIn(['participant', 'email'])}>
      {props.paper.getIn(['participant', 'email'])}
    </Input>

    <InputLabel style={{ paddingTop: '10px' }}>Paper Title</InputLabel>
    <Input
      multiline
      fullWidth
      onChange={handleEdit('title')}
      value={props.paper.getIn(['title'])}>
      {props.paper.getIn(['title'])}
    </Input>
  </div>
}

export default ConfPaper

ConfPaper.propTypes = {
  paper: PropTypes.object.isRequired,
  onPaperEdit: PropTypes.func.isRequired
}
