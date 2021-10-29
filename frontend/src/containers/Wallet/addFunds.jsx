import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, FormControl, Select, InputLabel, TextField,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { paymentCardData } from './testData'

const AddFunds = ({ open, onClose, onSubmit }) => (
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
        <h2 className='h2'> Add Funds </h2>
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
      <h4 className='h4 mt-30'> Choose payment option </h4>
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
      <h4 className='h4 mt-30'> Choose amount </h4>
      <TextField
        className='text-field-para is-fullwidth mt-10'
        InputProps={ { inputProps: { min: 0, step: 1 } } }
        type='number'
        variant='outlined'
        margin='dense'
        placeholder='e.g. 100'
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

AddFunds.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default AddFunds
