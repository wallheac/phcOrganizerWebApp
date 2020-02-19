import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { Save, Edit, InsertDriveFile, Done, Clear, VideoCall } from '@material-ui/icons'
import ProgramEditModal from './programEditModal'
import AvModal from './avModal'

const styles = {
  rowEven: { padding: '10px' },
  rowOdd: { padding: '10px', backgroundColor: '#D3D3D3' },
  first: { padding: '3px 0', borderBottom: '1px solid #F5F5F5', borderTop: '1px solid #F5F5F5' },
  rest: { padding: '3px 0', borderBottom: '1px solid #F5F5F5' },
  iconGroup: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  accepted: { color: 'green', backgroundColor: 'lightgreen', borderRadius: '50%' },
  rejected: { color: 'red', backgroundColor: 'pink', borderRadius: '50%' }
}

const ProgramRow = (props) => {
  const [editing, setEditing] = useState(false)
  const [avRequestOpen, setAvRequestOpen] = useState(false)

  const formatRoles = (roles) => {
    return roles.filter(role => role !== 'CONTACT').join(', ')
  }

  const handleEdit = () => setEditing(true)

  const handleClose = () => setEditing(false)

  const handleSave = (changedPanelFields) => {
    if (!changedPanelFields) {
      props.onSave(props.panel.getIn(['panelId']))
    } else {
      props.onSave(props.panel.getIn(['panelId']), changedPanelFields)
    }
    setEditing(false)
  }

  const handleFileClick = abstractUrl => event => {
    event.preventDefault()
    window.open(abstractUrl, '_blank')
  }

  const handleAccept = (panelId) => {
    setAccepted(panelId, true)
  }

  const handleReject = (panelId) => {
    setAccepted(panelId, false)
  }

  const handleToggleAvRequestOpen = () => {
    setAvRequestOpen(!avRequestOpen)
  }

  const setAccepted = (panelId, value) => {
    if (value !== props.panel.getIn(['accepted'])) {
      props.onToggleAccepted(panelId, value)
    }
  }

  return <Grid container spacing={2} style={props.index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
    <Grid item xs={2}>
      <div style={styles.iconGroup}>
        {props.panel.getIn(['panelName'])}
        <div style={{ display: 'inline-flex' }} >
          <div>
            <Edit style={{ color: 'darkgray' }}
              onClick={handleEdit}
            />
            <Save
              style={{ color: 'darkgray' }}
              onClick={handleSave}
            />
            <InsertDriveFile
              style={{ color: 'darkgray' }}
              onClick={handleFileClick(props.panel.getIn(['abstractUrl']))}
            />
            <VideoCall
              style={{ color: 'darkgray' }}
              onClick={handleToggleAvRequestOpen}
            />
          </div>
          <div>
            <Done
              style={props.panel.getIn(['accepted']) ? styles.accepted : { color: 'green' }}
              onClick={event => handleAccept(props.panel.getIn(['panelId']))} />
            <Clear style={props.panel.getIn(['accepted']) ? { color: 'red' } : styles.rejected }
              onClick={event => handleReject(props.panel.getIn(['panelId']))}/>
          </div>
        </div>
      </div>
    </Grid>
    <Grid item xs={1}>
      {props.panel.dateTime || 'unassigned'}
    </Grid>
    <Grid container item xs={9}>
      {props.panel.getIn(['participants']).map((participant, index) =>
        <Grid container item xs={12} key={index} style={index === 0 ? styles.first : styles.rest}>
          <Grid item xs={4} key={`${participant.getIn(['lastName'])}-name`}>{`${participant.getIn(['firstName'])} ${participant.getIn(['lastName'])}`}</Grid>
          {participant.getIn(['paper'])
            ? <Grid item xs={6} key={`${participant.getIn(['participantId'])}-name`} >{`${participant.getIn(['paper', 'title'])}`}</Grid>
            : <Grid item xs={6} key={`${participant.getIn(['participantId'])}-role`} >{(formatRoles(participant.getIn(['roles'])))}</Grid>
          }
        </Grid>
      )}</Grid>
    {
      editing &&
      <ProgramEditModal
        editing={editing}
        panel={props.panel}
        onClose={handleClose}
        onSubmit={props.onEditSubmit}
      />
    }
    {
      avRequestOpen &&
    <AvModal
      open={avRequestOpen}
      avRequested={props.panel.getIn(['avRequested'])}
      requestor={props.panel.getIn(['requestor'])}
      onSave={handleSave}
      onClose={handleToggleAvRequestOpen} />
    }
  </Grid>
}

ProgramRow.propTypes = {
  panel: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  onEditSubmit: PropTypes.func.isRequired,
  onToggleAccepted: PropTypes.func.isRequired
}

export default ProgramRow
