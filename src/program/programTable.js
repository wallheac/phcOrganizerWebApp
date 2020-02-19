import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import ProgramRow from './programRow'
import Sticky from 'react-stickynode'

const ProgramTable = (props) => {
  return <>
    <Sticky enabled={true} top={48}>
      <Grid container style={{ padding: '10px', fontWeight: '500', borderBottom: '2px solid gray', background: 'white' }}>
        <Grid item xs={2}>Panel Title</Grid>
        <Grid item xs={1}>Time</Grid>
        <Grid item xs={3}>Participants</Grid>
        <Grid item xs={3}>Papers</Grid>
      </Grid>
    </Sticky>
    {
      props.panels && (props.showAccepted || props.showRejected) && props.panels
        .filter(panel => (panel.getIn(['accepted']) === props.showAccepted || panel.getIn(['accepted']) !== props.showRejected))
        .map((panel, index) => {
          return <ProgramRow key={index}
            index={index}
            panel={panel}
            onEditSubmit={props.onEditSubmit}
            onSave={props.onSave}
            onToggleAccepted={props.onToggleAccepted}
          />
        })
    }
  </>
}

ProgramTable.propTypes = {
  panels: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onEditSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onToggleAccepted: PropTypes.func.isRequired,
  showRejected: PropTypes.bool,
  showAccepted: PropTypes.bool
}

export default ProgramTable
