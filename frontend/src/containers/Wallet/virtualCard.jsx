import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const VirtualCard = ({ open, onClose, onSubmit }) => (
  <Dialog
    disableScrollLock
    open={ open }
    onClose={ onClose }
    fullWidth
    maxWidth='xs'
    className='custom-modal wallet-root'
    classes={ { paper: 'wallet-modals' } }
  >
    <div className='header'>
      <DialogTitle>
        <h2 className='h2'> Virtual Card </h2>
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
      <p className='para'>
        Your credit card details will be visible immediately after you purchase the virtual card.
      </p>
      <h3 className='h3 bold text-center mt-30'> $ 0.10 </h3>
    </DialogContent>
    <DialogActions className='modal-actions'>
      <div className='sendQBEModal-buttons is-fullwidth'>
        <Button
          className='wide-button'
          classes={ { root: 'button-primary-small', label: 'button-primary-small-label' } }
          onClick={ onSubmit }
        >
          Buy
        </Button>
        <Button
          color='secondary'
          onClick={ onClose }
          className='cancel-button'
        >
          Cancel
        </Button>
      </div>
    </DialogActions>
  </Dialog>
)

VirtualCard.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default VirtualCard
