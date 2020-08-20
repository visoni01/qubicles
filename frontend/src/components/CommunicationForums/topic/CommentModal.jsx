import React, { useState, useEffect } from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useDispatch } from 'react-redux'
import MyUploadAdapter from '../../../utils/uploadImage'
import Loader from '../../loaders/circularLoader'

const NewComment = ({
  open, handleClose, handleSubmit, commentData, isEdit,
}) => {
  const [ comment, setComment ] = useState(commentData)
  const [ isImageUploading, setIsImageUploading ] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => { setComment(commentData) }, [ commentData ])

  const onSubmit = () => {
    handleSubmit(comment)
    setComment(commentData)
  }

  return (
    <Dialog open={ open } onClose={ handleClose }>
      <DialogTitle className='text-align-center'>
        {isEdit ? 'Update Post' : 'New Post' }
      </DialogTitle>
      <DialogContent className='overflow-x-hidden'>
        <CKEditor
          onChange={ (event, editor) => setComment(editor.getData()) }
          editor={ ClassicEditor }
          data={ comment }
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
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleClose } color='primary'>
          Cancel
        </Button>
        <Button onClick={ onSubmit } color='primary'>
          { isEdit ? 'Update' : 'Submit' }
        </Button>
      </DialogActions>
    </Dialog>
  )
}

NewComment.defaultProps = {
  commentData: '',
}

NewComment.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  commentData: PropTypes.string,
}

export default NewComment
