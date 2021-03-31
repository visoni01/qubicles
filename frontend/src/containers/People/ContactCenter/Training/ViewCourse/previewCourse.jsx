import React from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import CourseTrainerIntro from './CourseTrainerIntro'
import CourseDescription from './CourseDescription'
import CourseOverview from './CourseOverview'
import CourseReviews from './CourseReviews'
import './styles.scss'
import CourseActions from './CourseActions'

const PreviewCourse = () => {
  const { course } = useSelector((state) => state.trainingCourse)

  return (
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
            title={ course.informationSection.title }
            description={ course.informationSection.summary }
            goals={ course.informationSection.goals }
            outcomes={ course.informationSection.outcomes }
            preRequisites={ course.informationSection.preRequisites }
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
}

export default PreviewCourse
