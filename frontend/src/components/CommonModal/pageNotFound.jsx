import React from 'react'
import { Button, Grid } from '@material-ui/core'
import pageNotFound from '../../assets/images/error/page-not-found.svg'
import './styles.scss'

const PageNotFound = () => (
  <Grid container justify='center' className='role-selector text-center error-page' spacing={ 8 }>
    <Grid item>
      <img src={ pageNotFound } alt='Center logo' className='intro-logo' />
      <h2 className='h2 text-center mt-40'> Page not found </h2>
      <p className='para sz-xl mt-10 mb-30 text-center'>
        The page you are looking for no longer exists
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

export default PageNotFound
