import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogTitle, Button,
} from '@material-ui/core'

const ConfirmationModal = ({
  open, handleClose, handleConfirm, message, confirmButtonText,
}) => (
  <Dialog
    open={ open }
    onClose={ handleClose }
    aria-labelledby='delete-dialog-title'
  >
    <DialogTitle id='delete-dialog-title'>
      {message}
    </DialogTitle>
    <DialogActions>
      <Button onClick={ handleClose } variant='contained'>
        Cancel
      </Button>
      <Button onClick={ handleConfirm } variant='contained' autoFocus>
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
