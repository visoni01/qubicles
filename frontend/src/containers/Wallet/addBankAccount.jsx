import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, Button, IconButton, InputBase,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const AddBankAccount = ({
  open, onClose, onSubmit,
}) => (
  <Dialog
    disableScrollLock
    open={ open }
    onClose={ onClose }
    fullWidth
    maxWidth='sm'
    className='custom-modal wallet-root'
    classes={ { paper: 'wallet-modals' } }
  >
    <div className='header'>
      <DialogTitle>
        <h2 className='h2'>Add Bank Account</h2>
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
      <h4 className='h4 mt-30'>Account Holder</h4>
      <div className='mt-10'>
        <para className='para mt-30'> James Barnett</para>
      </div>
      <h4 className='h4 mt-30'>Routing Number (ACH or ABA)</h4>
      <InputBase
        InputProps={ { inputProps: { min: 0, step: 1 } } }
        type='number'
        placeholder='e.g. 100'
        className='search-input mt-10'
      />
      <h4 className='h4 mt-30'>Account Number</h4>
      <InputBase
        InputProps={ { inputProps: { min: 0, step: 1 } } }
        type='number'
        placeholder='e.g. 100'
        className='search-input mt-10'
      />
      <h4 className='h4 mt-30'>Confirm Account Number</h4>
      <InputBase
        InputProps={ { inputProps: { min: 0, step: 1 } } }
        type='number'
        placeholder='e.g. 100'
        className='search-input mt-10'
      />
      <h4 className='h4 mt-30'>Choose amount</h4>
      <InputBase
        InputProps={ { inputProps: { min: 0, step: 1 } } }
        type='number'
        placeholder='e.g. 100'
        className='search-input mt-10'
      />
    </DialogContent>
    <DialogActions className='modal-actions'>
      <div className='sendQBEModal-buttons is-fullwidth'>
        <Button
          disabled
          className='wide-button'
          classes={ { root: 'button-primary-small', label: 'button-primary-small-label' } }
          onClick={ onSubmit }
        >
          Add Account
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

AddBankAccount.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default AddBankAccount
