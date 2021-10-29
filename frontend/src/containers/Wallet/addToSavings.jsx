import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, TextField,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

const AddTOSavings = ({ open, onClose, onSubmit }) => {
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
          <h2 className='h2'> Add to Savings </h2>
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
          The amount you add to your savings will be locked for X hours. By keeping the amount locked you will be
          rewarded with an interest rate of X%. You can always unlock savings and they will be available after 72
          hours. You can also skip this time by paying a small fees of 1% of the amount you want to unlock.
        </p>

        <h4 className='h4 mt-30'> Amount </h4>
        <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
          <TextField
            className='text-field-para is-fullwidth mt-10'
            InputProps={ { inputProps: { min: 0, step: 1 } } }
            type='number'
            placeholder='QBE'
            variant='outlined'
            margin='dense'
            defaultValue={ savingsAmount }
            onChange={ setSavingsAmountCB }
          />
          <FontAwesomeIcon className='custom-fa-icon light ml-10 mr-10 mt-5' icon={ faExchangeAlt } />
          <TextField
            className='text-field-para is-fullwidth mt-10'
            InputProps={ { inputProps: { min: 0, step: 1 } } }
            type='number'
            placeholder='USD'
            variant='outlined'
            margin='dense'
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
            Add to Savings
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

AddTOSavings.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default AddTOSavings
