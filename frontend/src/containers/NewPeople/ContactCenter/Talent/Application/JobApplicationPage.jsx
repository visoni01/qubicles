import React from 'react'
import { Grid } from '@material-ui/core'
import ResumeIntro from './ResumeIntro'
import CoverLetter from './CoverLetter'
import SkillsPage from './SkillsPage'
import WorkHistory from './WorkHistory'
import Courses from './Courses'
import ResumeReviews from './ResumeReviews'
import JobApplicationActions from '../../Jobs/JobApplicationActions'
import { newNavBar } from '../../../../../hoc/navbar'

function JobApplicationPage() {
  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <ResumeIntro />
      </Grid>
      <Grid container spacing={ 3 } direction='column' item xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 }>
        <Grid item>
          <CoverLetter />
        </Grid>
        <Grid item>
          <SkillsPage />
        </Grid>
        <Grid item>
          <WorkHistory />
        </Grid>
        <Grid item>
          <Courses />
        </Grid>
        <Grid item>
          <ResumeReviews />
        </Grid>
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <JobApplicationActions />
      </Grid>
    </Grid>
  )
}

export default newNavBar(JobApplicationPage)
