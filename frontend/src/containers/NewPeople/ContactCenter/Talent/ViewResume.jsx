import React from 'react'
import { Grid } from '@material-ui/core'
import ResumeIntro from './Application/ResumeIntro'
import Courses from './Application/Courses'
import SkillsPage from './Application/SkillsPage'
import ResumeReviews from './Application/ResumeReviews'
import WorkHistory from './Application/WorkHistory'
import Actions from '../Jobs/Actions'
import { newNavBar } from '../../../../hoc/navbar'
import './styles.scss'

const ViewResume = () => (
  <Grid container spacing={ 3 }>
    <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
      <ResumeIntro />
    </Grid>
    <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 }>
      <SkillsPage />
      <WorkHistory />
      <Courses />
      <ResumeReviews />
    </Grid>
    <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
      <Actions />
    </Grid>
  </Grid>
)

export default newNavBar(ViewResume)
