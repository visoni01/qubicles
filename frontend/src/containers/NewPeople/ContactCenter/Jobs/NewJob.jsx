import React from 'react'
import { Grid } from '@material-ui/core'
import NewJobData from './NewJobData'
import NewJobRequirements from './NewJobRequirements'
import NewJobDetails from './NewJobDetails'
import { newNavBar } from '../../../../hoc/navbar'
import './styles.scss'
import JobApplicationActions from './JobApplicationActions'
import NewJobActions from './NewJobActions'

const NewJob = () => (
  <Grid container spacing={ 3 }>
    <Grid item xl={ 9 } lg={ 9 } md={ 9 } sm={ 8 }>
      <NewJobData />
      <NewJobRequirements />
      <NewJobDetails />
    </Grid>
    <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
      <JobApplicationActions />
    </Grid>
  </Grid>
)

export default newNavBar(NewJob)
