import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, Button, IconButton, InputBase, Grid,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Contacts = ({
  open, onClose, onSubmit,
}) => {
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
      maxWidth='md'
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

        <Grid container spacing={ 3 }>
          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 12 }>
            <h4 className='h4 mt-30'>Phone Number</h4>
            <div className='search-input mt-10'>
              <InputBase
                name='phoneNumber'
                InputProps={ { inputProps: { min: 0, step: 1 } } }
                type='number'
                placeholder='e.g. 1234567890'
                onChange={ setAddressCB }
              />
            </div>
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 12 }>
            <h4 className='h4 mt-30'>City</h4>
            <div className='search-input mt-10'>
              <InputBase
                name='city'
                className='input-field'
                defaultValue={ address.city }
                onChange={ setAddressCB }
              />
            </div>
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 12 }>
            <h4 className='h4 mt-30'>Lead ID</h4>
            <div className='search-input mt-10'>
              <InputBase
                name='leadId'
                InputProps={ { inputProps: { min: 0, step: 1 } } }
                type='number'
                placeholder='e.g. 12345'
                onChange={ setAddressCB }
              />
            </div>
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 12 }>
            <h4 className='h4 mt-30'>State</h4>
            <div className='search-input mt-10'>
              <InputBase
                name='state'
                className='input-field'
                defaultValue={ address.state }
              />
            </div>
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 12 }>
            <h4 className='h4 mt-30'>First Name</h4>
            <div className='search-input mt-10'>
              <InputBase
                name='firstName'
                className='input-field'
                defaultValue={ address.firstName }
              />
            </div>
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 12 }>
            <h4 className='h4 mt-30'>Last Name</h4>
            <div className='search-input mt-10'>
              <InputBase
                name='lastName'
                className='input-field'
                defaultValue={ address.lastName }
              />
            </div>
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 12 }>
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
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='modal-actions'>
        <div className='is-fullwidth pull-right'>
          <Button
            onClick={ onClose }
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Reset
          </Button>
          <Button
            classes={ {
              root: 'button-primary-small',
              label: 'button-primary-small-label',
            } }
            onClick={ onSubmit }
          >
            Search
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
