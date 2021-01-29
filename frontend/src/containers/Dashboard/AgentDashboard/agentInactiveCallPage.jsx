import React from 'react'
import { Grid } from '@material-ui/core'
import CallContact from './callContact'
import ContactMainTabs from './contactMainTabsWrapper'

const AgentInactiveCallPage = () => (
  <Grid item container spacing={ 4 }>
    <Grid item xl={ 3 } lg={ 3 } md={ 12 } sm={ 12 } xs={ 12 }>
      <CallContact />
    </Grid>
    <Grid item xl={ 9 } lg={ 9 } md={ 12 } sm={ 12 } xs={ 12 }>
      <ContactMainTabs />
    </Grid>
  </Grid>
)

export default AgentInactiveCallPage
