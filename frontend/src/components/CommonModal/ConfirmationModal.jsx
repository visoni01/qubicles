import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogTitle, Button, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const ConfirmationModal = ({
  open, handleClose, handleConfirm, message, confirmButtonText,
}) => (
  <Dialog
    open={ open }
    onClose={ handleClose }
    aria-labelledby='delete-dialog-title'
  >
    <div className='is-flex'>
      <DialogTitle classes={ { root: 'delete-dialog-title' } }>
        {message}
      </DialogTitle>
      <DialogActions className='cross-button'>
        <IconButton className='is-size-6 mt-10' onClick={ handleClose }>
          <FontAwesomeIcon icon={ faTimes } />
        </IconButton>
      </DialogActions>
    </div>
    <DialogActions classes={ { root: 'delete-dialog-buttons' } }>
      <Button
        onClick={ handleClose }
        variant='contained'
        className='custom-button-primary'
        classes={ { label: 'custom-button-label-hover' } }
      >
        Cancel
      </Button>
      <Button
        onClick={ handleConfirm }
        variant='contained'
        autoFocus
        className='custom-button-primary'
        classes={ { label: 'custom-button-label-hover' } }
      >
        {confirmButtonText}
      </Button>
    </DialogActions>
  </Dialog>
)

ConfirmationModal.defaultProps = {
  message: 'Are you sure to perform this action?',
  confirmButtonText: 'Confirm',
}

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  message: PropTypes.string,
  confirmButtonText: PropTypes.string,
}

export default ConfirmationModal
