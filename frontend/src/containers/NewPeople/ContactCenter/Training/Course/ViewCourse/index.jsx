import React from 'react'
import { Grid } from '@material-ui/core'
import CourseTrainerIntro from './CourseTrainerIntro'
import CourseDescription from './CourseDescription'
import CourseOverview from './CourseOverview'
import CourseReviews from './CourseReviews'
import Actions from '../../../Jobs/Actions'
import { courseDescription } from '../../testData'
import { newNavBar } from '../../../../../../hoc/navbar'
import './styles.scss'
import CourseActions from './CourseActions'

const ViewCourse = () => (
  <Grid container spacing={ 3 }>
    <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
      <CourseTrainerIntro />
    </Grid>
    <Grid
      container
      direction='column'
      item
      spacing={ 3 }
      xl={ 6 }
      lg={ 6 }
      md={ 6 }
      sm={ 4 }
    >
      <Grid item>
        <CourseDescription
          key={ courseDescription.title }
          title={ courseDescription.title }
          description={ courseDescription.description }
          goals={ courseDescription.goals }
          outcomes={ courseDescription.outcomes }
          prerequisites={ courseDescription.prerequisites }
        />
      </Grid>
      <Grid item>
        <CourseOverview />
      </Grid>
      <Grid item>
        <CourseReviews />
      </Grid>
    </Grid>
    <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
      <CourseActions />
    </Grid>
  </Grid>
)

export default newNavBar(ViewCourse)
