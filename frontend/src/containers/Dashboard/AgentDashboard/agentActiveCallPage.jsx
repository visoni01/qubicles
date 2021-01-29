import React from 'react'
import { Grid } from '@material-ui/core'
import AgentTodayActivity from './agentTodayActivity'
import AgentStats from './agentStats'

const AgentActiveCallPage = () => (
  <Grid item container spacing={ 4 }>
    {/*  Left Section */}
    <Grid item xl={ 3 } lg={ 3 } md={ 12 } sm={ 12 } xs={ 12 }>
      <AgentTodayActivity />
    </Grid>
    <Grid item xl={ 9 } lg={ 9 } md={ 12 } sm={ 12 } xs={ 12 }>
      <AgentStats />
    </Grid>
  </Grid>
)

export default AgentActiveCallPage
