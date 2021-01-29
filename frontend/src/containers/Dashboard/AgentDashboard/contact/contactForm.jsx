import React from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const contactForm = ({ setActivePage }) => (
  <>
    <h2 className='h2 mb-20'>Contacts</h2>
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
    <div className='is-fullwidth mt-40 mb-20'>
      <div className='display-inline-flex justify-between'>
        <Button
          classes={ {
            root: 'button-secondary-large',
            label: 'button-secondary-large-label',
          } }
        >
          Reset
        </Button>
      </div>
      <div className='pull-right'>
        <Button
          classes={ {
            root: 'button-primary-large',
            label: 'button-primary-large-label',
          } }
          onClick={ () => setActivePage(1) }
        >
          Search
        </Button>
      </div>
    </div>
  </>
)

contactForm.defaultProps = {
  setActivePage: () => {},
}

contactForm.propTypes = {
  setActivePage: PropTypes.func,
}

export default contactForm
