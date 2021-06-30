import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogTitle, Button, IconButton, Grid,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

const ConfirmationModal = ({
  open, handleClose, handleConfirm, message, confirmButtonText,
}) => (
  <Dialog
    open={ open }
    onClose={ handleClose }
    aria-labelledby='delete-dialog-title'
    className='custom-modal auto-height'
    maxWidth='xs'
    fullWidth
  >
    <Grid container>
      <Grid item xs={ 11 } sm={ 11 } md={ 11 } lg={ 11 } xl={ 11 }>
        <DialogTitle>
          <div className='h3'>{message}</div>
        </DialogTitle>
      </Grid>
      <Grid item xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 }>
        <DialogActions className='cross-button'>
          <IconButton
            className='is-size-6'
            onClick={ handleClose }
          >
            <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </Grid>
    </Grid>
    <DialogActions className='modal-actions'>
      <Button
        classes={ {
          root: 'button-secondary-small-red',
          label: 'button-secondary-small-label',
        } }
        onClick={ handleClose }
      >
        Cancel
      </Button>
      <Button
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
        onClick={ handleConfirm }
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
