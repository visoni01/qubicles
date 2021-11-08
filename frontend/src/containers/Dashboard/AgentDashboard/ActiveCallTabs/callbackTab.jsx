import React from 'react'
import {
  Grid, TextField, Switch, TextareaAutosize, Button,
} from '@material-ui/core'

const CallbackTab = () => (
  <div>
    <Grid container className='is-fullwidth callback-tab' spacing={ 4 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 4 } sm={ 6 } xs={ 12 }>
        <h4 className='h4'> Date </h4>
        <div className='mt-5'>
          <TextField
            className='text-field-para'
            type='date'
            InputLabelProps={ {
              shrink: true,
            } }
          />
        </div>
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 4 } sm={ 6 } xs={ 12 }>
        <h4 className='h4'> Time </h4>
        <div className='mt-5'>
          <TextField
            className='text-field-para'
            type='time'
            InputLabelProps={ {
              shrink: true,
            } }
            defaultValue='12:00'
          />
        </div>
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 4 } sm={ 6 } xs={ 12 }>
        <div className='display-inline-flex align-items-center'>
          <h4 className='h4 mr-20'> My Callback only </h4>
          <Switch
            className='switches'
            color='primary'
          />
        </div>
      </Grid>
      <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
        <div className='display-inline-flex align-items-center'>
          <h4 className='h4'> Description </h4>
          <span className='ml-5 para light'> (Optional) </span>
        </div>
        <div className='notes-box border-1 mt-10'>
          <TextareaAutosize
            aria-label='minimum height'
            autoComplete='off'
            rowsMin={ 6 }
            placeholder='Add some notes or a description...'
            className='para pt-5'
          />
        </div>
      </Grid>
      <Grid item container xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 } justify='flex-end'>
        <Grid item>
          <Button
            classes={ {
              root: 'button-primary-small',
              label: 'button-primary-small-label',
            } }
          >
            Create Callback
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </div>
)

export default CallbackTab
