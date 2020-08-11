import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, Button,
} from '@material-ui/core'

const AddNewGroupModal = ({
  open, handleClose, onSubmit, isUpdate, modalFields,
}) => {
  let modalHeading
  let submitButtonText
  if (isUpdate) {
    modalHeading = 'Update Group'
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

  const handleCreateGroup = () => {
    onSubmit(groupData)
    setGroupData(groupData)
  }

  return (
    <Dialog open={ open } onClose={ handleClose }>
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
        <Button onClick={ handleClose } color='primary'>
          Cancel
        </Button>
        <Button onClick={ handleCreateGroup } color='primary'>
          {submitButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AddNewGroupModal.defaultProps = {
  isUpdate: false,
  modalFields: {
    title: '',
    isPublic: false,
  },
}

AddNewGroupModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  modalFields: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
  }),
}

export default AddNewGroupModal
