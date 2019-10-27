import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ProgramRow from './programRow'

const ProgramTable = (props) => {
  return <Table>
    <TableHead>
      <TableRow>
        <TableCell>Panel Title</TableCell>
        <TableCell>Participants</TableCell>
        <TableCell>Papers</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {
        props.panels.map((panel, index) => {
          return <ProgramRow
            index={index}
            panel={panel}
          />
        })
      }
    </TableBody>
  </Table>
}

ProgramTable.propTypes = {
  panels: PropTypes.array.isRequired
}

export default ProgramTable
