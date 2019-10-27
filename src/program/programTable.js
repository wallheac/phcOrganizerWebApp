import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import ProgramRow from './programRow'
import Sticky from 'react-stickynode'

const ProgramTable = (props) => {
  return <>
  <Sticky enabled={true} top={48}>
    <Grid container style={{ padding: '10px', fontWeight: '500', borderBottom: '2px solid gray', background: 'white' }}>
      <Grid item xs={3}>Panel Title</Grid>
      <Grid item xs={3}>Participants</Grid>
      <Grid item xs={3}>Papers</Grid>
    </Grid>
    </Sticky>
    {
      props.panels.map((panel, index) => {
        return <ProgramRow key={index}
          index={index}
          panel={panel}
        />
      })
    }
  </>
}

ProgramTable.propTypes = {
  panels: PropTypes.array.isRequired
}

export default ProgramTable
