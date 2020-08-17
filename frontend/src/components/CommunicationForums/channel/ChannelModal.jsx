import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, Button,
} from '@material-ui/core'

const AddUpdateChannel = ({
  open, handleClose, onSubmit, isEdit, modalFields,
}) => {
  let modalTitle
  let onSubmitText
  if (isEdit) {
    modalTitle = 'Edit Channel'
    onSubmitText = 'Update'
  } else {
    modalTitle = 'Add Channel'
    onSubmitText = 'Create'
  }
  const [ channelData, setChannelData ] = useState(modalFields)

  const handleChange = useCallback((event) => {
    event.persist()
    // eslint-disable-next-line
    setChannelData((channelData) => (
      {
        ...channelData,
        [ event.target.name ]: (event.target.type === 'text' || event.target.type === 'textarea')
          ? event.target.value
          : event.target.checked,
      }))
  }, [ setChannelData ])

  const handleOnSubmit = () => {
    onSubmit(channelData)
    if (isEdit) {
      setChannelData(channelData)
    } else {
      setChannelData({
        title: '',
        description: '',
        isPublic: false,
        isCompanyAnn: false,
      })
    }
  }
  const handleCancelButton = () => {
    handleClose()
    setChannelData(modalFields)
  }

  return (
    <Dialog open={ open } onClose={ handleClose } classes={ { paper: 'channel-modal' } }>
      <DialogTitle className='text-align-center'>{modalTitle}</DialogTitle>
      <DialogContent>
        <TextField
          margin='dense'
          fullWidth
          variant='outlined'
          label='Title'
          value={ channelData.title }
          onChange={ handleChange }
          required
          name='title'
        />
        <TextField
          margin='dense'
          fullWidth
          multiline='true'
          rows='5'
          variant='outlined'
          label='Description'
          value={ channelData.description }
          onChange={ handleChange }
          required
          name='description'
        />
        <div>
          <div>
            <Checkbox
              checked={ channelData.isPublic }
              onChange={ handleChange }
              name='isPublic'
            />
            <span className='vertical-align-middle'>Make channel public</span>
          </div>
          <div>
            <Checkbox
              checked={ channelData.isCompanyAnn }
              onChange={ handleChange }
              name='isCompanyAnn'
            />
            <span className='vertical-align-middle'>Company announcements channel</span>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleCancelButton } color='primary' className='primary-button'>
          Cancel
        </Button>
        <Button onClick={ handleOnSubmit } color='primary' className='primary-button'>
          {onSubmitText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AddUpdateChannel.defaultProps = {
  isEdit: false,
  modalFields: {
    title: '',
    description: '',
    isPublic: false,
    isCompanyAnn: false,
  },
}

AddUpdateChannel.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  modalFields: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    isCompanyAnn: PropTypes.bool.isRequired,
  }),
}

export default AddUpdateChannel