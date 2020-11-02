import React from 'react'
import {
  Dialog, DialogTitle, DialogActions, IconButton, DialogContent, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function AddArticleModal({
  open, onSubmit, onClose,
}) {
  return (
    <Dialog
      disableScrollLock
      open={ open }
      className='custom-modal'
      fullWidth
      maxWidth='md'
    >
      <div className='header'>
        <DialogTitle className='h2'>
          New Article
        </DialogTitle>
        <DialogActions className='cross-button'>
          <IconButton
            className='is-size-6'
            onClick={ onClose }
          >
            <FontAwesomeIcon className='custom-fa-icon' icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent>
        <CKEditor
          editor={ ClassicEditor }
          data=''

        />
      </DialogContent>
      <DialogActions className='modal-actions'>
        <Button
          color='secondary'
          className='cancel-button'
          onClick={ onClose }
        >
          Cancel
        </Button>
        <Button
          className='button-primary-small'
          classes={ { label: 'primary-label' } }
          onClick={ onSubmit }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
