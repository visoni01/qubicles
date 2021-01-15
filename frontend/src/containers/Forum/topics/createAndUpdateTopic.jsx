import React, { useCallback, useState } from 'react'
import {
  Box, Button,
} from '@material-ui/core'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import MyUploadAdapter from '../../../utils/uploadImage'
import Loader from '../../../components/loaders/circularLoader'

const initialData = {
  title: '',
  description: '',
}

const CreateAndUpdateTopic = ({
  handleSubmit, handleCancel, isUpdate, topicUpdateData, updateTopic,
}) => {
  const newInitialData = isUpdate ? topicUpdateData : initialData
  const [ topicData, setTopicData ] = useState(newInitialData)
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
    if (isUpdate) {
      updateTopic(topicData)
    } else {
      handleSubmit(topicData)
      setTopicData(initialData)
    }
  }

  return (
    <Box className='custom-box'>
      <form>
        <h2 className='h2 mb-30'>
          {isUpdate ? 'Update Topic' : 'New Topic'}

        </h2>
        <div>
          <h3 className='h3'>Title</h3>
          <input
            className='custom-text-input-field mt-10 is-fullwidth'
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
            {isUpdate ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Box>
  )
}

CreateAndUpdateTopic.defaultProps = {
  handleSubmit: () => {},
  handleCancel: () => {},
  updateTopic: () => {},
  topicUpdateData: {},
}

CreateAndUpdateTopic.propTypes = {
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
  updateTopic: PropTypes.func,
  isUpdate: PropTypes.bool.isRequired,
  topicUpdateData: PropTypes.shape,

}

export default CreateAndUpdateTopic
