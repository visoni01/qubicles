import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CourseTrainerIntro from './CourseTrainerIntro'
import CourseDescription from './CourseDescription'
import CourseOverview from './CourseOverview'
import CourseReviews from './CourseReviews'
import './styles.scss'
import CourseActions from './CourseActions'
import { viewCourseRequestStart } from '../../../../../redux-saga/redux/people'

const ViewCourse = () => {
  let { courseId } = useParams()
  courseId = parseInt(courseId, 10)
  const { course } = useSelector((state) => state.viewCourse)
  const dispatch = useDispatch()
  const [ openCoursePlayer, setOpenCoursePlayer ] = useState(false)

  useEffect(() => {
    dispatch(viewCourseRequestStart({
      requestType: 'FETCH',
      dataType: 'Course Info',
      courseId,
    }))
  }, [ dispatch, courseId ])

  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <CourseTrainerIntro
          creatorId={ course.informationSection.creatorId }
        />
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
            description={ course.informationSection.description }
            goals={ course.informationSection.goals }
            outcomes={ course.informationSection.outcomes }
            requirements={ course.informationSection.requirements }
          />
        </Grid>
        <Grid item>
          <CourseOverview
            sections={ course.courseContent.sections }
            courseId={ course.courseId }
            isEnrolled={ course.isEnrolled }
            introVideo='https://picsum.photos/896/504'
            courseTitle={ course.informationSection.title }
            courseStatus={ course.courseDetails && course.courseDetails.status }
            openCoursePlayer={ openCoursePlayer }
            setOpenCoursePlayer={ setOpenCoursePlayer }
            currentUnitIndex={ course.currentUnitIndex }
            currentSectionIndex={ course.currentSectionIndex }
            isIntroVideoActive={ course.isIntroVideoActive }
            isSectionTestActive={ course.isSectionTestActive }
          />
        </Grid>
        <Grid item>
          <CourseReviews />
        </Grid>
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <CourseActions
          course={ course }
          openCoursePlayer={ openCoursePlayer }
          setOpenCoursePlayer={ setOpenCoursePlayer }
        />
      </Grid>
    </Grid>
  )
}

export default ViewCourse
