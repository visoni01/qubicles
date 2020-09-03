import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, Button, IconButton, Chip,
} from '@material-ui/core'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import MyUploadAdapter from '../../../utils/uploadImage'
import Loader from '../../loaders/circularLoader'

const TopicModal = ({
  open, handleClose, onSubmit, editTopicData, isEdit,
}) => {
  const [ topicData, setTopicData ] = useState(editTopicData)
  const [ addTopic, setAddTopic ] = useState(false)
  const [ newTag, setNewTag ] = useState('')
  const [ isImageUploading, setIsImageUploading ] = useState(false)
  const dispatch = useDispatch()

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
      setTopicData(editTopicData)
    }
  }

  const handleCloseModal = () => {
    setTopicData(editTopicData)
    setAddTopic(false)
    setNewTag('')
    handleClose()
  }

  const toggleAddTopic = useCallback(() => {
    // eslint-disable-next-line
    setAddTopic((addTopic) => !addTopic)
    setNewTag('')
  }, [])

  const deleteTag = (tag) => {
    const updatedTags = topicData.tags && topicData.tags.filter((topicTag) => topicTag !== tag)
    setTopicData({
      ...topicData,
      tags: updatedTags,
    })
  }

  const addTopicTag = () => {
    if (!newTag) return
    setTopicData({
      ...topicData,
      tags: topicData.tags ? [ ...topicData.tags, newTag ] : [ newTag ],
    })
    setAddTopic(false)
    setNewTag('')
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
          className='topic-titile-field'
        />
        <span className='pt-10 pb-5'>Description:</span>
        <CKEditor
          onChange={ handleDescriptionData }
          editor={ ClassicEditor }
          data={ topicData.description }
          className='mt-5'
          onInit={ (editor) => {
            // eslint-disable-next-line
            editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
              return new MyUploadAdapter(loader, setIsImageUploading, dispatch)
            }
          } }
        />
        <Loader
          className='add-status-loader'
          displayLoaderManually={ isImageUploading }
          enableOverlay={ false }
          size={ 50 }
        />
        <div>
          <div>
            <Checkbox
              checked={ topicData.isPublic }
              onChange={ handleChange }
              name='isPublic'
              classes={ { root: ' is-public-topic' } }
            />
            <span className='vertical-align-middle'>Make topic public</span>
          </div>
        </div>
        <div className='mb-20'>
          <span className='mr-10'>Tags:</span>
          {Boolean(topicData.tags && topicData.tags.length) && topicData.tags.map((tag) => (
            <Chip
              label={ tag }
              onDelete={ () => deleteTag(tag) }
              key={ tag }
              className='mr-10 mb-10 mt-10'
            />
          ))}
          {!addTopic ? (
            <IconButton onClick={ toggleAddTopic } classes={ { root: 'add-new-tag-button' } }>
              <FontAwesomeIcon icon={ faPlus } />
            </IconButton>
          )
            : (
              <div className='new-tag-field'>
                <TextField
                  value={ newTag }
                  onChange={ (e) => setNewTag(e.target.value) }
                  className='add-tag-textfield'
                />
                <IconButton size='small' onClick={ addTopicTag }>
                  <FontAwesomeIcon icon={ faCheck } className='submit-button mt-5 icon-hover' />
                </IconButton>
                <IconButton size='small' onClick={ toggleAddTopic }>
                  <FontAwesomeIcon icon={ faTimes } className='cancel-button mt-5 icon-hover' />
                </IconButton>
              </div>
            )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={ handleCloseModal }
          variant='contained'
          className='custom-button-primary'
          classes={ { label: 'custom-button-label-hover' } }
        >
          Cancel
        </Button>
        <Button
          onClick={ handleCreateChannel }
          variant='contained'
          className='custom-button-primary'
          classes={ { label: 'custom-button-label-hover' } }
          disabled={ isImageUploading }
        >
          {isEdit ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

TopicModal.defaultProps = {
  editTopicData: {
    title: '',
    isPublic: false,
    description: '',
    tags: [],
  },
  isEdit: false,
}

TopicModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editTopicData: PropTypes.shape({}),
  isEdit: PropTypes.bool,
}

export default TopicModal
