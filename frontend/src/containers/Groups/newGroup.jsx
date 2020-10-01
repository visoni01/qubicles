import React from 'react'
import {
  Box, FormControlLabel, Grid, Radio, RadioGroup, TextareaAutosize, Button,
} from '@material-ui/core'

const NewGroup = () => (
  <Box className='box'>
    <form>
      <Grid container spacing={ 3 }>
        <Grid item md={ 12 } sm={ 12 } xs={ 12 } className='mb-10'>
          <h2 className='h2'>
            Create new group
          </h2>
        </Grid>
        <Grid item md={ 6 } xs={ 12 }>
          <h3 className='h3'>Title</h3>
          <input
            className='primary-input-field mt-10 width-100-per'
            placeholder='Name of your group'
          />
        </Grid>
        <Grid item md={ 6 } xs={ 12 }>
          <h3 className='h3'>Permission</h3>
          <RadioGroup
            name='permission'
            label='Permission'
            className='is-display-block mt-10'
          >
            <FormControlLabel
              value='public'
              control={ <Radio size='small' /> }
              label='Public'
              className='para'
            />
            <FormControlLabel
              value='private'
              control={ <Radio size='small' /> }
              label='Private'
              className='para'
            />
          </RadioGroup>
        </Grid>
        <Grid item md={ 12 } sm={ 12 } xs={ 12 }>
          <h3 className='h3'>
            Description
          </h3>
          <TextareaAutosize
            className='primary-input-field width-100-per mt-10 mb-10'
            rowsMin={ 6 }
          />
        </Grid>
      </Grid>
      <div className='mt-10'>
        <Button
          color='secondary'
          className='cancel-button'
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          className='button-primary-small is-float-right'
          classes={ { label: 'primary-label' } }
        >
          Create
        </Button>
      </div>
    </form>
  </Box>
)

export default NewGroup
