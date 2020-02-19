import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, InputLabel, Button, Modal, Paper, FormControlLabel, Checkbox } from '@material-ui/core'

const AvModal = (props) => {
  const [requestor, setRequestor] = useState(props.requestor)
  const [avRequested, setAvRequested] = useState(props.avRequested)

  const handleSubmit = () => {
    handleClose()
    props.onSave({ avRequested, requestor })
  }

  const handleClose = () => {
    props.onClose()
  }

  const handleEdit = (event) => {
    event.preventDefault()
    setRequestor(event.target.value)
  }

  const toggleAvRequested = () => {
    setAvRequested(!avRequested)
  }

  return <Modal
    style={{ width: '40vw', left: '30vw', top: '10vh', maxHeight: '80%' }}
    open={props.open}
    onClose={handleClose}
  >
    <div>
      <Paper style={{ padding: '10px' }}>
        <div style={{ overflowY: 'scroll', maxHeight: '65vh' }}>
          <FormControlLabel
            control={<Checkbox
              checked={avRequested}
              onChange={toggleAvRequested}
            />}
            label="Av Requested"
          >
          </FormControlLabel>
          <InputLabel style={{ paddingTop: '3px' }}>Requestor</InputLabel>
          <Input
            style={{ paddingBottom: '3px' }}
            multiline
            fullWidth
            onChange={handleEdit}
            value={requestor}
          >
            {requestor}
          </Input>
        </div>
        <div style={{ paddingTop: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}>
      Submit
          </Button>
        </div>
      </Paper>
    </div>
  </Modal>
}

AvModal.propTypes = {
  open: PropTypes.bool,
  avRequested: PropTypes.bool,
  requestor: PropTypes.string,
  onAvRequested: PropTypes.func,
  onClose: PropTypes.func,
  onSave: PropTypes.func
}

export default AvModal
