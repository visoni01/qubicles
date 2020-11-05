import React from 'react'
import { Grid } from '@material-ui/core'
import NewJobData from './NewJobData'
import NewJobRequirements from './NewJobRequirements'
import NewJobDetails from './NewJobDetails'
import { newNavBar } from '../../../../hoc/navbar'
import './styles.scss'
import NewJobActions from './NewJobActions'

const NewJob = () => (
  <Grid container spacing={ 3 }>
    <Grid container item xl={ 9 } lg={ 9 } md={ 9 } sm={ 8 } spacing={ 3 } direction='column'>
      <Grid item>
        <NewJobData />
      </Grid>
      <Grid item>
        <NewJobRequirements />
      </Grid>
      <Grid item>
        <NewJobDetails />
      </Grid>
    </Grid>
    <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
      <NewJobActions />
    </Grid>
  </Grid>
)

export default newNavBar(NewJob)
