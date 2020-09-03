/* eslint-disable no-shadow */
import React, {
  useState, useCallback, useRef,
} from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, IconButton, Chip,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes, faCamera,
} from '@fortawesome/free-solid-svg-icons'
import { shortenFileName } from '../../utils/common'

const PostEditModal = ({
  open, handleClose, onSubmit, postDescription, userActivityId, activityCustom,
}) => {
  const [ postText, setPostText ] = useState(postDescription)
  const [ fileName, setFileName ] = useState('current-image.jpg')
  const [ showChip, setShowChip ] = useState(activityCustom)
  const fileInput = useRef()

  const handleChipDelete = () => {
    fileInput.current.value = ''
    setFileName(null)
    setShowChip(!showChip)
  }

  const handleImageRemove = (activityCustom, showChip) => {
    let removeImage = false
    if (activityCustom && !showChip) {
      removeImage = true
    }
    return removeImage
  }

  const handleUpdatePost = () => {
    if (!(postText && postText.trim())) {
      return
    }
    const editedPost = {
      file: fileInput.current.files && fileInput.current.files[ 0 ],
      text: postText,
      userActivityId,
      removeCurrentImage: handleImageRemove(activityCustom, showChip),
    }
    onSubmit(editedPost)
    fileInput.current.value = ''
    handleClose()
    if (showChip) {
      setFileName(('current-image.jpg'))
    }
  }

  const setPostTextCB = useCallback((event) => {
    setPostText(event.target.value)
  }, [])

  const handleCloseModal = () => {
    handleClose()
    setPostText(postDescription)
    setFileName('current-image.jpg')
    setShowChip(activityCustom)
  }

  const handleFileInputChange = useCallback(() => {
    const fileObj = fileInput.current.files[ 0 ]
    const shortFileName = shortenFileName(fileObj)
    setFileName(shortFileName)
    if (fileObj) {
      setShowChip((showChip) => !showChip)
    }
    // eslint-disable-next-line
  }, [ showChip ])

  const clear = () => {
    setPostText('')
    fileInput.current.value = ''
    setFileName(null)
    setShowChip((showChip) => !showChip)
  }

  return (
    <Dialog disableBackdropClick className='custom-edit-dialog' open={ open } onClose={ handleClose }>
      <div className='is-flex'>
        <DialogTitle className='text-align-center width-full'>
          Update Post
        </DialogTitle>
        <DialogActions className='cross-button'>
          <IconButton className='is-size-6' onClick={ handleCloseModal }>
            <FontAwesomeIcon icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent className='overflow-x-hidden' dividers>
        <TextField
          margin='dense'
          fullWidth
          multiline
          rowsMax={ 8 }
          variant='outlined'
          label='Description'
          value={ postText }
          onChange={ setPostTextCB }
          name='data'
          rows='8'
          placeholder='Write something ...'
          className='topic-titile-field'
          required
        />
        <div className='post-section columns is-multiline is-full'>
          <div className=' other-options column is-4 is-narrower'>
            <form onReset={ clear }>
              <div className='upload-file'>
                <FontAwesomeIcon icon={ faCamera } />
                <span className='file-input-label'>Media</span>
                <input
                  type='file'
                  className='input-field'
                  accept='image/*'
                  ref={ fileInput }
                  onChange={ handleFileInputChange }
                />
              </div>
            </form>
          </div>
          <div className='column is-7 is-full chip-custom'>
            {(showChip && fileName) && (
              <Chip
                variant='outlined'
                label={ fileName }
                onDelete={ handleChipDelete }
              />
            )}
          </div>
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
          onClick={ handleUpdatePost }
          variant='contained'
          className='custom-button-primary'
          classes={ { label: 'custom-button-label-hover' } }
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

PostEditModal.defaultProps = {
  activityCustom: null,
}

PostEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  postDescription: PropTypes.string.isRequired,
  userActivityId: PropTypes.number.isRequired,
  activityCustom: PropTypes.string,
}

export default PostEditModal
