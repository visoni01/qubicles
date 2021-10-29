import React from 'react'
import { Box, Divider, Grid } from '@material-ui/core'
// import PropTypes from 'prop-types'
import '../styles.scss'

const Wallet = () => (
  <Box className='custom-box wallet-root'>
    <h3 className='h3'> Wallet </h3>
    <h2 className='h2 mt-10'> 1864 QBE </h2>
    <p className='para'> $1864 USD </p>
    <p className='para mt-20 mb-10'> Recent Activities </p>

    <Grid container>
      <Grid item container justify='space-between' spacing={ 2 }>
        <Grid item xl={ 2 } lg={ 2 } sm={ 2 } xs={ 2 }>
          <p className='para bold'> 04 Sept </p>
        </Grid>
        <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 6 }>
          <p className='para'> Sales course: Managing difficult situations </p>
        </Grid>
        <Grid item xl={ 4 } lg={ 4 } sm={ 4 } xs={ 4 }>
          <div>
            <p className='para price-green'> 120 QBE </p>
            <p className='para light'> $120 USD </p>
          </div>
        </Grid>
      </Grid>
      <Divider className='divider' />
      <Grid item container justify='space-between' spacing={ 2 }>
        <Grid item xl={ 2 } lg={ 2 } sm={ 2 } xs={ 2 }>
          <p className='para bold'> 01 Sept </p>
        </Grid>
        <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 6 }>
          <p className='para'> Payment: Good Call Center </p>
        </Grid>
        <Grid item xl={ 4 } lg={ 4 } sm={ 4 } xs={ 4 }>
          <div>
            <p className='para price-green'> 1200 QBE </p>
            <p className='para light'> $1200 USD </p>
          </div>
        </Grid>
      </Grid>
      <Divider className='divider' />
      <Grid item container justify='space-between' spacing={ 2 }>
        <Grid item xl={ 2 } lg={ 2 } sm={ 2 } xs={ 2 }>
          <p className='para bold'> 26 Aug </p>
        </Grid>
        <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 6 }>
          <p className='para'>  Buy Course: How to talk with clients </p>
        </Grid>
        <Grid item xl={ 4 } lg={ 4 } sm={ 4 } xs={ 4 }>
          <div>
            <p className='para price-red'> -12 QBE </p>
            <p className='para light'> $12 USD </p>
          </div>
        </Grid>
      </Grid>
    </Grid>
    <Divider className='divider' />
    <p className='primary-text-link text-center mb-5'> Go to Wallet </p>
  </Box>
)

Wallet.propTypes = {
}

export default Wallet
