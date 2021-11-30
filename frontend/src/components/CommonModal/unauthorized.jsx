import React from 'react'
import { Button, Grid } from '@material-ui/core'
import unauthorized from '../../assets/images/error/unauthorized.svg'
import './styles.scss'

const Unauthorized = () => (
  <Grid container justify='center' className='role-selector text-center error-page' spacing={ 8 }>
    <Grid item>
      <img src={ unauthorized } alt='Center logo' className='intro-logo' />
      <h2 className='h2 text-center mt-40'> Unauthorized </h2>
      <p className='para sz-xl mt-10 mb-30 text-center'>
        You don't have the required permission to visit this page.
      </p>
      <Button
        classes={ {
          root: 'button-primary-large',
          label: 'button-primary-large-label',
        } }
      >
        Back to Home
      </Button>
    </Grid>
  </Grid>
)

export default Unauthorized
