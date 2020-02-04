import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox, FormControlLabel } from '@material-ui/core'

const Filters = (props) => {
  const toggleAccepted = () => {
    props.onShowAcceptanceToggle('Accepted')
  }

  const toggleRejected = () => {
    props.onShowAcceptanceToggle('Rejected')
  }

  return <div>
    <h3>Show Paper Status:</h3>
    <div style={{marginBottom: '1em' }}>
      <FormControlLabel
        control={<Checkbox
          checked={props.showAccepted}
          onChange={toggleAccepted}
        />}
        label="Accepted"
      >
      </FormControlLabel>
      <FormControlLabel
        control={<Checkbox
          checked={props.showRejected}
          onChange={toggleRejected}
        />}
        label="Rejected"
      >
      </FormControlLabel>
    </div>
  </div>
}

Filters.propTypes = {
  showRejected: PropTypes.bool,
  showAccepted: PropTypes.bool,
  onShowAcceptanceToggle: PropTypes.func.isRequired

}

export default Filters
