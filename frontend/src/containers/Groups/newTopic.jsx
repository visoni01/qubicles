import React, { useCallback, useState } from 'react'
import {
  Box, FormControlLabel, Grid, Radio, RadioGroup, TextareaAutosize, Button,
} from '@material-ui/core'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import MyUploadAdapter from '../../utils/uploadImage'
import Loader from '../../components/loaders/circularLoader'

const initialData = {
  title: '',
  description: '',
}

const NewTopic = ({ handleSubmit, handleCancel }) => {
  const [ topicData, setTopicData ] = useState(initialData)
  const [ isImageUploading, setIsImageUploading ] = useState(false)
  const dispatch = useDispatch()

  const handleChange = useCallback((event) => {
    event.persist()
    // eslint-disable-next-line
    setTopicData((topicData) => (
      {
        ...topicData,
        title: event.target.value,
      }))
  }, [ setTopicData ])

  const handleDescriptionData = useCallback((event, editor) => {
    // eslint-disable-next-line
    setTopicData((topicData) => ({
      ...topicData,
      description: editor.getData(),
    }))
  }, [ setTopicData ])

  const onSubmit = () => {
    handleSubmit(topicData)
    setTopicData(initialData)
  }

  const handleCloseModal = () => {
    setTopicData(initialData)
    handleCancel()
  }

  return (
    <Box className='primary-box padding-20'>
      <form>
        <h2 className='h2 mb-30'>
          New Topic
        </h2>
        <div>
          <h3 className='h3'>Title</h3>
          <input
            className='primary-input-field mt-10 width-100-per'
            placeholder='Name of your topic'
            value={ topicData.title }
            name='title'
            onChange={ handleChange }
          />
        </div>
        <div className='mt-10'>
          <h3 className='h3 mb-10'>
            Description
          </h3>
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
        </div>
        <div className='mt-10'>
          <Button
            color='secondary'
            className='cancel-button'
            onClick={ handleCancel }
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            className='button-primary-small is-float-right'
            classes={ { label: 'primary-label' } }
            onClick={ onSubmit }
          >
            Create
          </Button>
        </div>
      </form>
    </Box>
  )
}

NewTopic.defaultProps = {
  handleSubmit: () => {},
  handleCancel: () => {},
}

NewTopic.propTypes = {
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
}

export default NewTopic
