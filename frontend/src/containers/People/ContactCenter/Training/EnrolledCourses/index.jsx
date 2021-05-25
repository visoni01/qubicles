import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Box, Button, Divider, Grid,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import ROUTE_PATHS from '../../../../../routes/routesPath'
import EnrolledCourseCard from './enrolledCourseCard'
import { enrolledCourses } from '../testData'

const EnrolledCourses = () => {
  const history = useHistory()

  return (
    <Box className='custom-box'>
      <div className='mb-30'>
        <Button
          onClick={ () => history.push(ROUTE_PATHS.PEOPLE_TRAINING_TAB) }
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          <FontAwesomeIcon icon={ faChevronLeft } className='custom-fa-icon white mr-10' />
          Back
        </Button>
      </div>

      <div className='mb-30'>
        <h3 className='h3 mb-20'>Enrolled Courses</h3>
        <Grid container spacing={ 3 }>
          {enrolledCourses.filter((course) => course.courseProgress < 100).map((course) => (
            <EnrolledCourseCard key={ course.courseId } { ...course } />
          ))}
        </Grid>
      </div>

      <div>
        <Divider />
        <div className='mt-30 mb-30'>
          <h3 className='h3 mb-20'>Passed Courses</h3>
          <Grid container spacing={ 3 }>
            {enrolledCourses.filter((course) => course.courseProgress === 100).map((course) => (
              <EnrolledCourseCard key={ course.courseId } { ...course } />
            ))}
          </Grid>
        </div>
      </div>

      {false && (
      <div className='mt-10 mb-10 is-fullwidth'>
        <h3 className='h3 text-center'>No courses found!</h3>
      </div>
      )}
    </Box>
  )
}

export default EnrolledCourses
