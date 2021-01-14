import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, Button, IconButton, InputBase,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const AddCreditCard = ({
  open, onClose, onSubmit,
}) => (
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
        <h2 className='h2'>Add Credit Card</h2>
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
      <h4 className='h4 mt-30'>Credit Card Holder</h4>
      <div className='mt-10'>
        <para className='para mt-30'> James Barnett</para>
      </div>
      <h4 className='h4 mt-30'>Card Number</h4>
      <InputBase
        InputProps={ { inputProps: { min: 0, step: 1 } } }
        type='number'
        placeholder='e.g. XXXX XXXX XXXX 1234 '
        className='search-input mt-10'
      />
      <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
        <div className='mr-20'>
          <h4 className='h4 mt-30'>Expiration Date</h4>
          <InputBase
            InputProps={ { inputProps: { min: 0, step: 1 } } }
            type='number'
            placeholder='e.g. 01/01/2025'
            className='search-input mt-10'
          />
        </div>
        <div>
          <h4 className='h4 mt-30'>CVV</h4>
          <InputBase
            InputProps={ { inputProps: { min: 0, step: 1 } } }
            type='number'
            placeholder='e.g. 100'
            className='search-input mt-10'
          />
        </div>
      </div>
    </DialogContent>
    <DialogActions className='modal-actions'>
      <div className='sendQBEModal-buttons is-fullwidth'>
        <Button
          disabled
          className='wide-button'
          classes={ { root: 'button-primary-small', label: 'button-primary-small-label' } }
          onClick={ onSubmit }
        >
          Add Credit Card
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

AddCreditCard.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default AddCreditCard
