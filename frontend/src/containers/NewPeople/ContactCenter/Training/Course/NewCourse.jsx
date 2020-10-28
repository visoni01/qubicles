import React from 'react'
import { Grid } from '@material-ui/core'
import { newNavBar } from '../../../../../hoc/navbar'
import CourseInformation from './CourseInformation'
import NewCourseActions from './Actions'
import './styles.scss'

const NewCourse = () => (
  (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 9 } lg={ 9 } md={ 9 } sm={ 12 }>
        <CourseInformation />
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 12 }>
        <NewCourseActions />
      </Grid>
    </Grid>
  )
)

export default newNavBar(NewCourse)
