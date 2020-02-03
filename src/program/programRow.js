import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { Save, Edit, InsertDriveFile } from '@material-ui/icons'
import ProgramEditModal from './programEditModal'

const styles = {
  rowEven: { padding: '10px' },
  rowOdd: { padding: '10px', backgroundColor: '#D3D3D3' },
  first: { padding: '3px 0', borderBottom: '1px solid #F5F5F5', borderTop: '1px solid #F5F5F5' },
  rest: { padding: '3px 0', borderBottom: '1px solid #F5F5F5' },
  iconGroup: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
}

const ProgramRow = (props) => {
  const [editing, setEditing] = useState(false)

  const formatRoles = (roles) => {
    return roles.filter(role => role !== 'CONTACT').join(', ')
  }

  const handleEdit = () => setEditing(true)

  const handleClose = () => setEditing(false)

  const handleSave = () => {
    props.onSave(props.panel.getIn(['panelId']))
  }

  const handleFileClick = abstractUrl => event => {
    event.preventDefault()
    window.open(abstractUrl, '_blank')
  }

  return <Grid container spacing={2} style={props.index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
    <Grid item xs={2}>
      <div style={styles.iconGroup}>
        {props.panel.getIn(['panelName'])}
        <div >
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
  </Grid>
}

ProgramRow.propTypes = {
  panel: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  onEditSubmit: PropTypes.func.isRequired
}

export default ProgramRow
