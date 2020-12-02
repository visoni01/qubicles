import React from 'react'
import { Grid } from '@material-ui/core'
import AccountSection from './AccountSection'
import IntegrationSection from './IntegrationSection'
import RatesSection from './RatesSection'

export default function Settings() {
  return (
    <Grid container spacing={ 5 } direction='column'>
      <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
        <AccountSection />
      </Grid>
      <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
        <IntegrationSection />
      </Grid>
      <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
        <RatesSection />
      </Grid>
    </Grid>
  )
}
