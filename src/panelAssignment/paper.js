import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, InputLabel } from '@material-ui/core'

const ConfPaper = (props) => {
  const [title, setTitle] = useState(props.paper.title)
  const [firstName, setFirstName] = useState(props.paper.participant.firstName)
  const [lastName, setLastName] = useState(props.paper.participant.lastName)
  const [status, setStatus] = useState(props.paper.participant.status)
  const [institution, setInstitution] = useState(props.paper.participant.institution)
  const [email, setEmail] = useState(props.paper.participant.email)

  const handleEdit = name => event => {
    event.preventDefault()
    switch (name) {
      case 'firstName':
        setFirstName(event.target.value)
        break
      case 'title':
        setTitle(event.target.value)
        break
      case 'lastName':
        setLastName(event.target.value)
        break
      case 'status':
        setStatus(event.target.value)
        break
      case 'institution':
        setInstitution(event.target.value)
        break
      case 'email':
        setEmail(event.target.value)
    }
  }

  return <div style={{ paddingTop: '40px' }}>
    <div style={{ paddingTop: '10px', display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <InputLabel >First Name</InputLabel>
        <Input
          multiline
          fullWidth
          onChange={handleEdit('firstName')}
          value={firstName}>
          {firstName}
        </Input>
      </div>
      <div style={{ paddingLeft: '10px', width: '50%' }}>
        <InputLabel>Last Name</InputLabel>
        <Input
          multiline
          fullWidth
          onChange={handleEdit('lastName')}
          value={lastName}>
          {lastName}
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
          value={status}>
          {status}
        </Input>
      </div>
      <div style={{ paddingLeft: '10px', width: '50%' }}>
        <InputLabel>Institution</InputLabel>
        <Input
          multiline
          fullWidth
          onChange={handleEdit('institution')}
          value={institution}>
          {institution}
        </Input>
      </div>
    </div>

    <InputLabel style={{ paddingTop: '10px' }}>Email</InputLabel>
    <Input
      multiline
      onChange={handleEdit('email')}
      value={email}>
      {email}
    </Input>

    <InputLabel style={{ paddingTop: '10px' }}>Paper Title</InputLabel>
    <Input
      multiline
      fullWidth
      onChange={handleEdit('title')}
      value={title}>
      {title}
    </Input>
  </div>
}

export default ConfPaper

ConfPaper.propTypes = {
  paper: PropTypes.object.isRequired
}
