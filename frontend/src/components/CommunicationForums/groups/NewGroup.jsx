import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, Button,
} from '@material-ui/core'

const AddNewGroupModal = ({ open, handleClose, onSubmit }) => {
  const [ groupData, setGroupData ] = useState({
    title: '',
    isPublic: false,
  })

  const handleCheckBox = useCallback((event) => {
    // eslint-disable-next-line
    setGroupData((groupData) => ({ ...groupData, isPublic: event.target.checked }))
  }, [ setGroupData ])

  const handleGroupTitle = useCallback((event) => {
    event.persist()
    // eslint-disable-next-line
    setGroupData((groupData) => ({ ...groupData, title: event.target.value }))
  }, [ setGroupData ])

  const handleCreateGroup = () => {
    onSubmit(groupData)
    setGroupData({
      title: '',
      isPublic: false,
    })
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
