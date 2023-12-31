import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import CourseTrainerIntro from './CourseTrainerIntro'
import CourseDescription from './CourseDescription'
import CourseOverview from '../../../../../components/People/ContactCenter/Training/ViewCourse/CourseOverview'
import CourseReviews from './Reviews'
import CourseActions from './CourseActions'
import { resetViewCourseReducer, viewCourseRequestStart } from '../../../../../redux-saga/redux/people'
import { resetUserData } from '../../../../../redux-saga/redux/user'
import { REQUEST_TYPES } from '../../../../../utils/constants'
import { COURSE_INFO } from '../../../../../redux-saga/redux/constants'
import './styles.scss'

const ViewCourse = () => {
  const [ openCoursePlayer, setOpenCoursePlayer ] = useState(false)
  const [ openReviewModal, setOpenReviewModal ] = useState(false)

  const {
    course, dataType, isLoading, requestType,
  } = useSelector((state) => state.viewCourse)

  const dispatch = useDispatch()
  const location = useLocation()
  let { courseId } = useParams()
  courseId = parseInt(courseId, 10)

  useEffect(() => {
    dispatch(viewCourseRequestStart({
      requestType: REQUEST_TYPES.FETCH,
      dataType: COURSE_INFO,
      courseId,
    }))
    return () => {
      dispatch(resetUserData())
      dispatch(resetViewCourseReducer())
    }
  }, [ dispatch, courseId ])

  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <CourseTrainerIntro
          creatorId={ course.informationSection.creatorId }
        />
      </Grid>
      <Grid container direction='column' item spacing={ 3 } xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 }>
        <Grid item>
          <CourseDescription
            title={ course.informationSection.title }
            description={ course.informationSection.description }
            goals={ course.informationSection.goals }
            outcomes={ course.informationSection.outcomes }
            requirements={ course.informationSection.requirements }
            requiredCourses={ course.informationSection.requiredCourses }
            dataType={ dataType }
            isLoading={ isLoading }
            isCreator={ course.isCreator }
          />
        </Grid>
        <Grid item>
          <CourseOverview
            sections={ course.courseContent.sections }
            courseId={ course.courseId }
            isEnrolled={ course.isEnrolled }
            introVideo={ course.contentSection && course.contentSection.introductionVideo }
            courseTitle={ course.informationSection.title }
            courseStatus={ course.courseDetails && course.courseDetails.status }
            openCoursePlayer={ openCoursePlayer }
            setOpenCoursePlayer={ setOpenCoursePlayer }
            currentUnitIndex={ course.currentUnitIndex }
            currentSectionIndex={ course.currentSectionIndex }
            isIntroVideoActive={ course.isIntroVideoActive }
            isSectionTestActive={ course.isSectionTestActive }
            dataType={ dataType }
            isLoading={ isLoading }
            isCreator={ course.isCreator }
          />
        </Grid>
        <Grid item>
          <CourseReviews
            courseId={ courseId }
            openReviewModal={ openReviewModal }
            setOpenReviewModal={ setOpenReviewModal }
          />
        </Grid>
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <CourseActions
          course={ course }
          openCoursePlayer={ openCoursePlayer }
          setOpenCoursePlayer={ setOpenCoursePlayer }
          isLoading={ isLoading }
          dataType={ dataType }
          continueCourse={ location.continueCourse }
          openReviewModal={ openReviewModal }
          setOpenReviewModal={ setOpenReviewModal }
          requestType={ requestType }
        />
      </Grid>
    </Grid>
  )
}

export default ViewCourse
