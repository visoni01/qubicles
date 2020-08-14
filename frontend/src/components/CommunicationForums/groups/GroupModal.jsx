import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, Button,
} from '@material-ui/core'

const AddUpdateGroupModal = ({
  open, handleClose, onSubmit, isUpdate, modalFields,
}) => {
  let modalHeading
  let submitButtonText
  if (isUpdate) {
    modalHeading = 'Edit Group'
    submitButtonText = 'Update'
  } else {
    modalHeading = 'New Group'
    submitButtonText = 'Create'
  }
  const [ groupData, setGroupData ] = useState(modalFields)

  const handleCheckBox = useCallback((event) => {
    // eslint-disable-next-line
    setGroupData((groupData) => ({ ...groupData, isPublic: event.target.checked }))
  }, [ setGroupData ])

  const handleGroupTitle = useCallback((event) => {
    event.persist()
    // eslint-disable-next-line
    setGroupData((groupData) => ({ ...groupData, title: event.target.value }))
  }, [ setGroupData ])

  const handleOnSubmit = () => {
    onSubmit(groupData)
    if (isUpdate) {
      setGroupData(groupData)
    } else {
      setGroupData({
        title: '',
        isPublic: false,
      })
    }
  }
  const handleCancelButton = () => {
    handleClose()
    setGroupData(modalFields)
  }

  return (
    <Dialog open={ open } onClose={ handleClose } classes={ { paper: 'group-modal' } }>
      <DialogTitle className='text-align-center'>{modalHeading}</DialogTitle>
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
        <Button onClick={ handleCancelButton } color='primary' className='primary-button'>
          Cancel
        </Button>
        <Button onClick={ handleOnSubmit } color='primary' className='primary-button'>
          {submitButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AddUpdateGroupModal.defaultProps = {
  isUpdate: false,
  modalFields: {
    title: '',
    isPublic: false,
  },
}

AddUpdateGroupModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  modalFields: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
  }),
}

export default AddUpdateGroupModal
