import React, {
  useState, useCallback, useEffect, useRef,
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
  open, handleClose, onSubmit, postDescription, userActivityId,
}) => {
  const [ postText, setPostText ] = useState(postDescription)
  const [ fileName, setFileName ] = useState(null)
  const fileInput = useRef()

  const handleUpdatePost = useCallback(() => {
    if (!(postText && postText.trim())) {
      return
    }
    const editedPost = {
      file: fileInput.current.files && fileInput.current.files[ 0 ],
      text: postText,
      userActivityId,
    }
    onSubmit(editedPost)
    handleClose()
  }, [ postText, fileInput ])

  const setPostTextCB = useCallback((event) => {
    setPostText(event.target.value)
  }, [])

  const handleCloseModal = () => {
    handleClose()
  }

  const handleChipDelete = () => {
    fileInput.current.value = ''
    setFileName(null)
  }

  const handleFileInputChange = useCallback(() => {
    const fileObj = fileInput.current.files[ 0 ]
    const shortFileName = shortenFileName(fileObj)
    setFileName(shortFileName)
  }, [])

  const clear = () => {
    setPostText('')
    fileInput.current.value = ''
    setFileName(null)
  }

  return (
    <Dialog open={ open } onClose={ handleClose }>
      <div className='is-flex'>
        <DialogTitle className='text-align-center width-full'>
          Update Post Status
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
          multiline
          rowsMax={ 5 }
          variant='outlined'
          label='Description'
          value={ postText }
          onChange={ setPostTextCB }
          name='data'
          rows='8'
          placeholder='Write something ...'
          className='topic-titile-field'
        />
        {/* <span className='pt-10 pb-5'>Description:</span> */}
        <div className='other-options column is-4 is-narrower'>
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
        {/* <div className='mb-20' /> */}
        <div className='columns is-multiline is-full chip-custom'>
          {fileName && (
          <Chip
            variant='outlined'
            label={ fileName }
            onDelete={ handleChipDelete }
          />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={ handleCloseModal }
          variant='contained'
          className='primary-button'
          classes={ { label: 'primary-button-label' } }
        >
          Cancel
        </Button>
        <Button
          onClick={ handleUpdatePost }
          variant='contained'
          className='primary-button'
          classes={ { label: 'primary-button-label' } }
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

PostEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  postDescription: PropTypes.string.isRequired,
  userActivityId: PropTypes.number.isRequired,
}

export default PostEditModal
