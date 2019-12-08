import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Save, Edit, InsertDriveFile } from '@material-ui/icons'
import PanelEditModal from './panelEditModal'

const Panel = (props) => {
  const [editing, setEditing] = useState(false)

  const handleEdit = () => {
    setEditing(true)
  }

  return <div
    style={props.hoveredPanel === props.panel.getIn(['title']) ? styles.panelHover : styles.panelItem}
    onDragEnter={event => props.onDragEnter(event)}
    onDragOver={event => event.preventDefault()}
    onDrop={event => props.onDrop(event, props.panel)}
  >
    <div style={styles.iconGroup}>
      {props.panel.getIn(['title'])}
      <div >
        <Edit style={{ color: 'darkgray' }} onClick={handleEdit}/>
        <Save style={{ color: 'darkgray' }}/>
      </div>
    </div>
    <div>
      {
        props.panel.getIn(['papers']) && props.panel.getIn(['papers']).map(paper =>
          <div key={paper.getIn(['paperId'])} style={styles.iconGroup}>
            <div style={{ fontWeight: '400', fontSize: '0.8em', paddingLeft: '1em' }}>
              {`${paper.getIn(['participant', 'firstName'])} ${paper.getIn(['participant', 'lastName'])}: ${paper.getIn(['title'])}`}
            </div>
            <InsertDriveFile
              onClick={props.onFileClick(paper.getIn(['abstractUrl']))}
              style={{ color: 'darkgray' }}/>
          </div>)
      }
    </div>
    {
      editing &&
      <PanelEditModal
        editing={editing}
        panel={props.panel}
        onClose={setEditing}
        onSubmit={props.onSubmit}
      />
    }
  </div>
}

const styles = {
  panelHover: { backgroundColor: '#DCDCDC', fontWeight: 'bold', fontSize: '1.3em', padding: '3px' },
  panelItem: { backgroundColor: 'white', fontWeight: 'bold', fontSize: '1.1em', padding: '3px' },
  iconGroup: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
}

Panel.propTypes = {
  onDrop: PropTypes.func.isRequired,
  onDragEnter: PropTypes.func.isRequired,
  hoveredPanel: PropTypes.string,
  panel: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFileClick: PropTypes.func.isRequired
}

export default Panel
