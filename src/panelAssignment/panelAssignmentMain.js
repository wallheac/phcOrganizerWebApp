import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'

const PanelAssignmentMain = (theme) => {
  return <>
    <Grid container spacing={2} style={{ padding: '10px' }}>
      <Grid item xs={6}>
        <Typography variant="h5">Unassigned Papers</Typography>
        <Paper>TESTING GRID 1</Paper>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5">Available Panels</Typography>
        <Paper>TESTING GRID 2</Paper>
      </Grid>
    </Grid>
  </>
}

export default PanelAssignmentMain
