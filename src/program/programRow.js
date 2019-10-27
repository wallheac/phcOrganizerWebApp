import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const styles = {
  rowEven: { padding: '10px' },
  rowOdd: { padding: '10px', backgroundColor: '#D3D3D3' }
}

const ProgramRow = (props) => {
  const formatRoles = (roles) => {
    return roles.filter(role => role !== 'CONTACT').join(', ')
  }

  return <>
    {props.panel.participants.map((participant, index) =>
      <TableRow key={index} style={props.index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
        <TableCell align='right'>
          {props.panel.panelName}
        </TableCell>
        <TableCell key={`${participant.lastName}-name`}>{`${participant.firstName} ${participant.lastName}`}</TableCell>
        {participant.paper
          ? <TableCell key={`${participant.participantId}-name`} >{`${participant.paper.title}`}</TableCell>
          : <TableCell key={`${participant.participantId}-role`} >{(formatRoles(participant.roles))}</TableCell>
        }
      </TableRow>
    )}
  </>
}

ProgramRow.propTypes = {
  panel: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default ProgramRow
