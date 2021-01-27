import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, Button, IconButton, Grid, TextField,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import ContactsSearch from './contactsSearch'

const Contacts = ({
  open, onClose,
}) => {
  const [ openContactInfo, setOpenContactInfo ] = useState(false)

  return (
    <Dialog
      disableScrollLock
      open={ open }
      onClose={ onClose }
      maxWidth='md'
      className='custom-modal agent-root'
      classes={ { root: 'agent-modal' } }
    >

      <div className='header'>
        <DialogTitle>
          {!openContactInfo && (<h2 className='h2'>Contacts</h2>)}
          {openContactInfo && (
            <div className='mb-20'>
              <Button
                classes={ {
                  root: 'MuiButtonBase-root button-primary-small',
                  label: 'MuiButton-label button-primary-small-label',
                } }
                onClick={ () => setOpenContactInfo(false) }
              >
                <FontAwesomeIcon icon={ faChevronLeft } className='mr-10' />
                Back
              </Button>
            </div>
          )}
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
        {!openContactInfo && (
          <div>
            <Grid container spacing={ 3 }>
              <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
                <p className='para'>
                  Quickly search for contact using one of the fields below. Hint: Phone number is the best and faster
                  search option.
                </p>
              </Grid>
              <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
                <h4 className='h4'>Phone Number</h4>
                <TextField
                  className='text-field-para is-fullwidth'
                  type='number'
                  variant='outlined'
                  margin='dense'
                  placeholder='e.g. 1234567890'
                />
              </Grid>
              <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
                <h4 className='h4'>City</h4>
                <TextField
                  className='text-field-para is-fullwidth'
                  variant='outlined'
                  margin='dense'
                />
              </Grid>
              <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
                <h4 className='h4'>Lead ID</h4>
                <TextField
                  className='text-field-para is-fullwidth'
                  variant='outlined'
                  margin='dense'
                />
              </Grid>
              <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
                <h4 className='h4'>State</h4>
                <TextField
                  className='text-field-para is-fullwidth'
                  variant='outlined'
                  margin='dense'
                />
              </Grid>
              <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
                <h4 className='h4'>First Name</h4>
                <TextField
                  className='text-field-para is-fullwidth'
                  variant='outlined'
                  margin='dense'
                />
              </Grid>
              <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
                <h4 className='h4'>Last Name</h4>
                <TextField
                  className='text-field-para is-fullwidth'
                  variant='outlined'
                  margin='dense'
                />
              </Grid>
              <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
                <h4 className='h4'>Zip Code</h4>
                <TextField
                  className='text-field-para is-fullwidth'
                  variant='outlined'
                  type='number'
                  margin='dense'
                  placeholder='e.g. 12345'
                />
              </Grid>
            </Grid>
          </div>
        )}
        {openContactInfo && (<ContactsSearch />)}
      </DialogContent>
      {!openContactInfo && (
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
            onClick={ () => setOpenContactInfo(true) }
          >
            Search
          </Button>
        </div>
      </DialogActions>
      )}
    </Dialog>
  )
}

Contacts.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Contacts
