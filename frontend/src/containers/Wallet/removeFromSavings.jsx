import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, Button, IconButton, InputBase, Switch,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

const RemoveFromSavings = ({
  open, onClose, onSubmit,
}) => {
  const [ savingsAmount, setSavingsAmount ] = useState(0)

  const setSavingsAmountCB = useCallback((event) => {
    const { name, value } = event.target
    setSavingsAmount((amount) => ({
      ...amount,
      [ name ]: value,
    }))
  }, [ ])

  return (
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
          <h2 className='h2'>Remove from Savings</h2>
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
        <div className='display-inline-flex direction-column is-fullwidth'>
          <h4 className='h4 light text-center'> Max available balance </h4>
          <h3 className='h3 bold text-center'> 2,631 QBE </h3>
        </div>

        <p className='para mt-30'>
          Removed funds will be available after 72 hours. You can skip this waiting period by paying 1% fee based
          on the amount you want to remove from your savings.
        </p>

        <h4 className='h4 mt-30'>Amount</h4>
        <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
          <InputBase
            InputProps={ { inputProps: { min: 0, step: 1 } } }
            type='number'
            placeholder='QBE'
            className='search-input mt-10'
            defaultValue={ savingsAmount }
            onChange={ setSavingsAmountCB }
          />
          <FontAwesomeIcon className='custom-fa-icon light ml-10 mr-10 mt-5' icon={ faExchangeAlt } />
          <InputBase
            placeholder='USD'
            className='search-input mt-10'
            InputProps={ { inputProps: { min: 0, step: 1 } } }
            type='number'
          />
        </div>
        <div className='display-inline-flex justify-between align-items-center is-halfwidth mt-30'>
          <h4 className='h4'>Instant(1% fee)</h4>
          <Switch
            className='switches'
            color='primary'
          />
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
            Remove from Savings
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
}

RemoveFromSavings.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default RemoveFromSavings
