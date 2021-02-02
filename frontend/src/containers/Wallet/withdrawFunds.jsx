import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, Button, IconButton,
  FormControl, Select, InputLabel, TextField,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { paymentCardData } from './testData'

const WithdrawFunds = ({
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
        <h2 className='h2'>Withdraw</h2>
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
        <h4 className='h4 light text-center'> Max withdrawal balance </h4>
        <h3 className='h3 bold text-center'> 2,631 QBE </h3>
      </div>
      <h4 className='h4 mt-30'>Withdraw to</h4>
      <FormControl variant='outlined' className='drop-down-bar'>
        <InputLabel margin='dense' variant='outlined' className='mt-10'>
          Choose card
        </InputLabel>
        <Select
          margin='dense'
          variant='outlined'
          native
          label='Choose category'
          className='mt-10'
        >
          <option aria-label='None' value='' />
          {paymentCardData.map((card) => (
            <option key={ card.id } value={ card.cardDetails }>
              { `${ card.bankName } ${ card.cardDetails }`}
            </option>
          ))}
        </Select>
      </FormControl>
      <h4 className='h4 mt-30'>Amount</h4>
      <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
        <TextField
          className='text-field-para is-fullwidth mt-10'
          InputProps={ { inputProps: { min: 0, step: 1 } } }
          type='number'
          placeholder='QBE'
          variant='outlined'
          margin='dense'
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
          Withdraw
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

WithdrawFunds.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default WithdrawFunds
