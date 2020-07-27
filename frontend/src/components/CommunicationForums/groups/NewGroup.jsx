import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, Button,
} from '@material-ui/core'

const AddNewGroupModal = ({ open, handleClose, onSubmit }) => {
  const [ groupData, setGroupData ] = useState({
    title: '',
    isPublic: false,
  })

  const handleCheckBox = (event) => {
    setGroupData({ ...groupData, isPublic: event.target.checked })
  }

  const handleGroupTitle = (event) => {
    setGroupData({ ...groupData, title: event.target.value })
  }

  const handleCreateGroup = () => {
    if (groupData.title) {
      onSubmit(groupData)
      setGroupData({
        title: '',
        isPublic: false,
      })
    }
  }

  return (
    <Dialog open={ open } onClose={ handleClose }>
      <DialogTitle className='text-align-center'>New Group</DialogTitle>
      <DialogContent>
        <TextField
          margin='dense'
          id='name'
          fullWidth
          variant='outlined'
          label='Title'
          value={ groupData.title }
          onChange={ handleGroupTitle }
          required
        />
      </DialogContent>
      <DialogContent>
        <Checkbox
          checked={ groupData.isPublic }
          onChange={ handleCheckBox }
        />
        <span className='vertical-align-middle'>Make group public</span>
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleClose } color='primary'>
          Cancel
        </Button>
        <Button onClick={ handleCreateGroup } color='primary'>
          Create Group
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AddNewGroupModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default AddNewGroupModal
