import React from 'react'
import { Grid } from '@material-ui/core'
import ContactCenterIntro from './ContactCenterIntro'
import JobPost from './JobPost'
import TopTalent from '../Talent/TopTalent'
import { newNavBar } from '../../../../hoc/navbar'
import './styles.scss'

const JobView = () => (
  <Grid container spacing={ 3 }>
    <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
      <ContactCenterIntro />
    </Grid>
    <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 }>
      <JobPost />
    </Grid>
    <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
      <TopTalent heading='Suggestions For This Job' />
    </Grid>
  </Grid>
)

export default newNavBar(JobView)
