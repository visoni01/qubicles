import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, Button,
} from '@material-ui/core'

const AddNewTopicModal = ({ open, handleClose, onSubmit }) => {
  const [ topicData, setTopicData ] = useState({
    title: '',
    isPublic: false,
    isCompanyAnn: false,
  })

  const handleChange = useCallback((event) => {
    event.persist()
    // eslint-disable-next-line
    setTopicData((topicData) => (
      {
        ...topicData,
        [ event.target.name ]: event.target.type === 'text' ? event.target.value : event.target.checked,
      }))
  }, [ setTopicData ])

  const handleCreateChannel = () => {
    if (topicData.title) {
      onSubmit(topicData)
      setTopicData({
        title: '',
        isPublic: false,
      })
    }
  }

  return (
    <Dialog open={ open } onClose={ handleClose }>
      <DialogTitle className='text-align-center'>New Channel</DialogTitle>
      <DialogContent>
        <TextField
          margin='dense'
          fullWidth
          variant='outlined'
          label='Title'
          value={ topicData.title }
          onChange={ handleChange }
          required
          name='title'
        />
        <div>
          <div>
            <Checkbox
              checked={ topicData.isPublic }
              onChange={ handleChange }
              name='isPublic'
            />
            <span className='vertical-align-middle'>Make topic public</span>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleClose } color='primary'>
          Cancel
        </Button>
        <Button onClick={ handleCreateChannel } color='primary'>
          Create Topic
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AddNewTopicModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default AddNewTopicModal
