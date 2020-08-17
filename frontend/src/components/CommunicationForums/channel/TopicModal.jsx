import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, Button, IconButton,
} from '@material-ui/core'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const AddNewTopicModal = ({
  open, handleClose, onSubmit, editTopicData, isEdit,
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
      <div className='is-flex'>
        <DialogTitle className='text-align-center width-full'>
          {isEdit ? 'Update Topic' : 'New Topic'}
        </DialogTitle>
        <DialogActions className='cross-button'>
          <IconButton className='is-size-6' onClick={ handleClose }>
            <FontAwesomeIcon icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
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
        <span>Description:</span>
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
        <Button
          onClick={ handleClose }
          variant='contained'
          className='new-topic-button'
          classes={ { label: 'new-topic-button-label' } }
        >
          Cancel
        </Button>
        <Button
          onClick={ handleCreateChannel }
          variant='contained'
          className='new-topic-button'
          classes={ { label: 'new-topic-button-label' } }
        >
          {isEdit ? 'Update' : 'Save'}
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
  isEdit: false,
}

AddNewTopicModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editTopicData: PropTypes.shape({}),
  isEdit: PropTypes.bool,
}

export default AddNewTopicModal
