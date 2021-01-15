import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, Button, IconButton, InputBase,
  InputLabel, FormControl, Select,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Contacts = ({
  open, onClose, onSubmit,
}) => {
  // Temporarily added country names to be displayed.
  const Country = [ 'US', 'France', 'Spain', 'India' ]

  const [ address, setAddress ] = useState({
    street: '',
    zip: '',
    city: '',
    state: '',
    country: '',
  })

  const setAddressCB = useCallback((event) => {
    const { name, value } = event.target
    setAddress((currentAddress) => ({
      ...currentAddress,
      [ name ]: value,
    }))
  }, [ ])

  return (
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
          <h2 className='h2'>Contacts</h2>
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
          Quickly search for contact using one of the fields below. Hint: Phone number is the best and faster
          search option.
        </p>
        {/* <h3 className='h3 bold mt-30'> Mailing address </h3> */}
        <h4 className='h4 mt-30'>Street</h4>
        <div className='search-input mt-10'>
          <InputBase
            name='street'
            className='input-field'
            defaultValue={ address.street }
          />
        </div>

        <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
          <div>
            <h4 className='h4 mt-30'>Zip Code</h4>
            <div className='search-input mt-10'>
              <InputBase
                name='zip'
                InputProps={ { inputProps: { min: 0, step: 1 } } }
                type='number'
                placeholder='e.g. 12345'
                onChange={ setAddressCB }
              />
            </div>
          </div>
          <div className='ml-20'>
            <h4 className='h4 mt-30'>City</h4>
            <div className='search-input mt-10'>
              <InputBase
                name='city'
                className='input-field'
                onChange={ setAddressCB }
              />
            </div>
          </div>
        </div>
        <h4 className='h4 mt-30'>State</h4>
        <div className='search-input mt-10'>
          <InputBase
            name='state'
            className='input-field'
            onChange={ setAddressCB }
          />
        </div>
        <h4 className='h4 mt-30'>Country</h4>
        <FormControl variant='outlined' className='drop-down-bar'>
          <InputLabel margin='dense' variant='outlined' className='mt-10'>
            Choose country
          </InputLabel>
          <Select
            name='country'
            margin='dense'
            variant='outlined'
            native
            label='Choose country'
            className='mt-10'
            onChange={ setAddressCB }
          >
            <option aria-label='None' value='' />
            {Country.map((country) => (
              <option key={ country } value={ country }>
                { country }
              </option>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions className='modal-actions'>
        <div className='sendQBEModal-buttons is-fullwidth'>
          <Button
            disabled
            className='wide-button'
            classes={ { root: 'button-primary-small', label: 'button-primary-small-label' } }
            onClick={ onSubmit }
          >
            Search
          </Button>
          <Button
            color='secondary'
            onClick={ onClose }
            className='cancel-button'
          >
            Reset
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  )
}

Contacts.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default Contacts
