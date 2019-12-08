import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input, InputLabel, Button, Modal, Paper } from '@material-ui/core'
import EditablePaper from './editablePaper'

const PanelEditModal = (props) => {
  const [title, setTitle] = useState(props.panel.getIn(['title']))
  const [papers, setPapers] = useState(props.panel.getIn(['papers']))

  useEffect(() => {
    const papersCopy = props.panel.getIn(['papers'])
    setPapers(papersCopy)
  }, [props])

  const handleClose = () => {
    props.onClose(false)
  }

  const handleTitleEdit = (event) => {
    setTitle(event.target.value)
  }

  const handlePaperEdit = (name, value, paperId) => {
    const currentPapers = papers
    const paperIndex = currentPapers.findIndex(currentPaper => currentPaper.getIn(['paperId']) === paperId)
    const changedPaper = currentPapers.getIn([paperIndex.toString()])
    let newPaper
    if (name === 'title') {
      newPaper = changedPaper.updateIn(['title'], () => value)
    } else {
      newPaper = changedPaper.updateIn(['participant', name], () => value)
    }
    const newPaperList = currentPapers.splice(paperIndex, 1, newPaper)
    setPapers(newPaperList)
  }

  const handleSubmit = () => {
    props.onClose(false)
    props.onSubmit(props.panel.getIn(['title']), title, papers)
  }

  return <Modal
    style={{ width: '40vw', left: '30vw', top: '10vh', maxHeight: '80%' }}
    open={props.editing}
    onClose={handleClose}
  >
    <div>
      <Paper style={{ padding: '10px' }}>
        <div style={{ overflowY: 'scroll', maxHeight: '65vh' }}>
          <InputLabel style={{ paddingTop: '3px' }}>Panel Title</InputLabel>
          <Input
            style={{ paddingBottom: '3px' }}
            multiline
            fullWidth
            onChange={handleTitleEdit}
            value={title}
          >
            {title}
          </Input>
          {
            papers && papers.map(paper =>
              <div key={paper.getIn(['paperId'])}><EditablePaper
                paper={paper}
                onPaperEdit={handlePaperEdit}
              />
              </div>
            )
          }
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

PanelEditModal.propTypes = {
  editing: PropTypes.bool.isRequired,
  panel: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default PanelEditModal
