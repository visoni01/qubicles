import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogTitle, DialogActions, IconButton, DialogContent, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const AddArticleModal = ({
  open, onSubmit, onClose,
}) => (
  <Dialog
    disableScrollLock
    open={ open }
    className='custom-modal'
    fullWidth
    maxWidth='md'
  >
    <div className='header'>
      <DialogTitle>
        <h2 className='h2'>New Article</h2>
      </DialogTitle>
      <DialogActions className='cross-button'>
        <IconButton
          className='is-size-6'
          onClick={ onClose }
        >
          <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
        </IconButton>
      </DialogActions>
    </div>
    <DialogContent>
      <CKEditor
        editor={ ClassicEditor }
        data=''
        onInit={ (editor) => {
          editor.setData('')
          editor.editing.view.change((writer) => {
            writer.setStyle(
              'height',
              '350px',
              editor.editing.view.document.getRoot(),
            )
          })
        } }
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

AddArticleModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AddArticleModal
