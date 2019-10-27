import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

const styles = {
  rowEven: { padding: '10px' },
  rowOdd: { padding: '10px', backgroundColor: '#D3D3D3' }
}

const ProgramRow = (props) => {
  const formatRoles = (roles) => {
    return roles.filter(role => role !== 'CONTACT').join(', ')
  }

  return <Grid container spacing={2} style={props.index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
    <Grid item xs={3}>
      {props.panel.panelName}
    </Grid>
    <Grid container item xs={9}>
      {props.panel.participants.map((participant, index) =>
        <Grid container item xs={12} key={index}>
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
