import React, { useState, useEffect } from 'react'
import { fromJS } from 'immutable'
import PropTypes from 'prop-types'
import { InputLabel, Select, MenuItem } from '@material-ui/core'

const PanelTimeSelector = (props) => {
  const getPossibleTimes = async () => {
    const possibleTimes = await fetch('http://localhost:3001/organizer/dates')
      .then(response => response.json())
    setPossibleTimes(fromJS(possibleTimes.content))
  }

  useEffect(() => {
    getPossibleTimes()
  }, [])

  const handleChange = event => {
    const chosenTime = possibleTimes.filter(time => time.getIn(['dateString']) === event.target.value).getIn(['0'])
    props.onTimeSlotChange(chosenTime.getIn(['instant']))
  }

  const [possibleTimes, setPossibleTimes] = useState(null)

  return (
    <>
      <InputLabel>Select Time</InputLabel>
      <Select
        onChange={handleChange}>
        {possibleTimes &&
          possibleTimes.map(time => (
            <MenuItem value={time.getIn(['dateString'])} key={time.getIn(['instant'])}>
              {`${time.getIn(['dateString'])}`}
            </MenuItem>
          ))
        }
      </Select>
    </>
  )
}

export default PanelTimeSelector
