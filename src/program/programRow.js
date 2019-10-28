import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

const styles = {
  rowEven: { padding: '10px' },
  rowOdd: { padding: '10px', backgroundColor: '#D3D3D3' },
  first: { padding: '3px 0', borderBottom: '1px solid #F5F5F5', borderTop: '1px solid #F5F5F5' },
  rest: { padding: '3px 0', borderBottom: '1px solid #F5F5F5' }
}

const ProgramRow = (props) => {
  const formatRoles = (roles) => {
    return roles.filter(role => role !== 'CONTACT').join(', ')
  }

  return <Grid container spacing={2} style={props.index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
    <Grid item xs={2}>
      {props.panel.panelName}
    </Grid>
    <Grid item xs={1}>
      {props.panel.dateTime || 'unassigned'}
    </Grid>
    <Grid container item xs={9}>
      {props.panel.participants.map((participant, index) =>
        <Grid container item xs={12} key={index} style={index === 0 ? styles.first : styles.rest}>
          <Grid item xs={4} key={`${participant.lastName}-name`}>{`${participant.firstName} ${participant.lastName}`}</Grid>
          {participant.paper
            ? <Grid item xs={6} key={`${participant.participantId}-name`} >{`${participant.paper.title}`}</Grid>
            : <Grid item xs={6} key={`${participant.participantId}-role`} >{(formatRoles(participant.roles))}</Grid>
          }
        </Grid>
      )}</Grid>
  </Grid>
}

ProgramRow.propTypes = {
  panel: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default ProgramRow
