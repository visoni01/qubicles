import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Divider } from '@material-ui/core'

export default function TextDivider({
  message,
}) {
  return (
    <Grid container className='text-divider' spacing={ 1 } justify='space-between'>
      <Grid item xl={ 4 } lg={ 4 } md={ 3 } sm={ 2 } className='side'>
        <Divider className='border' />
      </Grid>
      <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 8 } className='middle'>
        <span className='centered-text'>
          {message}
        </span>
      </Grid>
      <Grid item xl={ 4 } lg={ 4 } md={ 3 } sm={ 2 } className='side'>
        <Divider className='border' />
      </Grid>
    </Grid>
  )
}

TextDivider.propTypes = {
  message: PropTypes.string.isRequired,
}
