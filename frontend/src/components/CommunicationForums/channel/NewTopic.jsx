import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, Button,
} from '@material-ui/core'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const AddNewTopicModal = ({
  open, handleClose, onSubmit, editTopicData,
}) => {
  const [ topicData, setTopicData ] = useState(editTopicData)

  const handleChange = useCallback((event) => {
    event.persist()
    // eslint-disable-next-line
    setTopicData((topicData) => (
      {
        ...topicData,
        [ event.target.name ]: event.target.type === 'text' ? event.target.value : event.target.checked,
      }))
  }, [ setTopicData ])

  const handleDescriptionData = useCallback((event, editor) => {
    // eslint-disable-next-line
    setTopicData((topicData) => ({
      ...topicData,
      description: editor.getData(),
    }))
  }, [ setTopicData ])

  const handleCreateChannel = () => {
    if (topicData.title) {
      onSubmit(topicData)
      setTopicData({
        title: '',
        isPublic: false,
        description: '',
      })
    }
  }

  return (
    <Dialog open={ open } onClose={ handleClose }>
      <DialogTitle className='text-align-center'>New Topic</DialogTitle>
      <DialogContent className='overflow-x-hidden'>
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
        <span>Description</span>
        <CKEditor
          onChange={ handleDescriptionData }
          editor={ ClassicEditor }
          data={ topicData.description }
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
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AddNewTopicModal.defaultProps = {
  editTopicData: {
    title: '',
    isPublic: false,
    description: '',
  },
}

AddNewTopicModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editTopicData: PropTypes.shape({}),
}

export default AddNewTopicModal
