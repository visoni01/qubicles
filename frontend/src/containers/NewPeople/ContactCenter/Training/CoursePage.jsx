import React from 'react'
import { Grid } from '@material-ui/core'
import CourseTrainerIntro from './CourseTrainerIntro'
import CourseDescription from './CourseDescription'
import CourseReviews from './CourseReviews'
import Actions from '../Jobs/Actions'
import { courseDescription } from './testData'
import { newNavBar } from '../../../../hoc/navbar'
import './style.scss'

const ViewResume = () => (
  <Grid container spacing={ 3 }>
    <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
      <CourseTrainerIntro />
    </Grid>
    <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 }>
      <CourseDescription
        key={ courseDescription.title }
        title={ courseDescription.title }
        description={ courseDescription.description }
        goals={ courseDescription.goals }
        outcomes={ courseDescription.outcomes }
        prerequisites={ courseDescription.prerequisites }
      />
      <CourseReviews />
    </Grid>
    <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
      <Actions />
    </Grid>
  </Grid>
)

export default newNavBar(ViewResume)
