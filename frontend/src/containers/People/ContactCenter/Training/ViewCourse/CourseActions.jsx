/* eslint-disable complexity */
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button, Box, Card, CardMedia,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import '../style.scss'
import _ from 'lodash'
import PropTypes from 'prop-types'
import AssessmentTestModal from './Test/assessmentTestModal'
import BuyCourseModal from './buyCourseModal'
import { formatDate } from '../../../../../utils/common'
import { updateCurrentUnitAndSectionIndex, viewCourseRequestStart } from '../../../../../redux-saga/redux/people'
import { setOpenCoursePlayerPropType, viewCoursePropType, typePropType } from './propTypes'
import { startLoader, stopLoader } from '../../../../../redux-saga/redux/utils'
import CourseActionSkeleton from '../Skeletons/courseActionSkeleton'

const CourseActions = ({
  course, setOpenCoursePlayer, type, isLoading, dataType,
}) => {
  const [ isAssessmentModalOpen, setIsAssessmentModalOpen ] = useState(false)
  const [ openBuyCoursePopup, setOpenBuyCoursePopup ] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (dataType === 'Buy Course' && isLoading) {
      dispatch(startLoader())
    }
    if (dataType === 'Buy Course' && isLoading === false) {
      setOpenBuyCoursePopup(false)
      dispatch(stopLoader())
    }
  }, [ dataType, isLoading, setOpenBuyCoursePopup, dispatch ])

  const handlePreview = useCallback(() => {
    dispatch(updateCurrentUnitAndSectionIndex({
      currentSectionIndex: 0,
      currentUnitIndex: -1,
      isIntroVideoActive: true,
    }))
    setOpenCoursePlayer(true)
  }, [ setOpenCoursePlayer, dispatch ])

  const handleStartOrContinueCourse = useCallback(() => {
    if ((course.isEnrolled && course.courseDetails.status === 'enrolled')
    || (!course.isEnrolled && course.informationSection.price === 0)) {
      dispatch(viewCourseRequestStart({
        requestType: 'FETCH',
        dataType: 'Start Course',
        courseId: course.courseId,
      }))
      dispatch(updateCurrentUnitAndSectionIndex({
        currentSectionIndex: 0,
        currentUnitIndex: -1,
        isIntroVideoActive: true,
      }))
    } else if (course.isEnrolled && course.courseDetails.status === 'inprogress') {
      if (course.courseContent.sections.length && course.courseContent.sections[ 0 ].status === '') {
        const unitIndex = _.findLastIndex(course.courseContent.sections[ 0 ].units, [ 'status', 'completed' ])
        dispatch(updateCurrentUnitAndSectionIndex({
          currentSectionIndex: 0,
          currentUnitIndex: unitIndex,
          isIntroVideoActive: unitIndex === -1,
        }))
        if (unitIndex !== -1) {
          dispatch(viewCourseRequestStart({
            requestType: 'UPDATE',
            dataType: 'Course Unit',
            courseId: course.courseId,
            sectionId: course.courseContent.sections[ 0 ].id,
            unitId: course.courseContent.sections[ 0 ].units[ unitIndex ].unitId,
            status: 'completed',
          }))
        }
      } else {
        let sectionIndex = _.findIndex(course.courseContent.sections, [ 'status', 'inprogress' ])
        let unitIndex
        if (sectionIndex !== -1) {
          unitIndex = _.findIndex(course.courseContent.sections[ sectionIndex ].units, [ 'status', 'inprogress' ])
        } else {
          sectionIndex = _.findLastIndex(course.courseContent.sections, [ 'status', 'completed' ])
          if (sectionIndex < course.courseContent.sections.length - 1) {
            sectionIndex += 1
            if (course.courseContent.sections[ sectionIndex ].units[ 0 ].status === 'completed') {
              unitIndex = course.courseContent.sections[ sectionIndex ].units.length - 1
            } else {
              unitIndex = 0
            }
          } else {
            unitIndex = course.courseContent.sections[ sectionIndex ].units.length - 1
          }
        }
        if (unitIndex === -1) {
          unitIndex = course.courseContent.sections[ sectionIndex ].units.length - 1
        }
        dispatch(updateCurrentUnitAndSectionIndex({
          currentSectionIndex: sectionIndex,
          currentUnitIndex: unitIndex,
          isIntroVideoActive: false,
        }))
        dispatch(viewCourseRequestStart({
          requestType: 'UPDATE',
          dataType: 'Course Unit',
          courseId: course.courseId,
          sectionId: course.courseContent.sections[ sectionIndex ].id,
          unitId: course.courseContent.sections[ sectionIndex ].units[ unitIndex ].unitId,
          status: course.courseContent.sections[ sectionIndex ].units[ unitIndex ].status === 'completed'
            ? 'completed' : 'inprogress',
        }))
      }
    }
    setOpenCoursePlayer(true)
  }, [ course.isEnrolled, course.courseDetails, course.courseId, dispatch, setOpenCoursePlayer,
    course.informationSection.price, course.courseContent.sections ])

  if (isLoading) {
    return (
      <CourseActionSkeleton />
    )
  }

  return (
    <>
      <Box className='custom-box actions-box'>
        <div className='mb-20'>
          <Card className='course-card'>
            <Box className='custom-box no-padding price-overlay'>
              <p className='h3 price-qbe text-center'>
                { `${ course.informationSection.price } `}
                <span className='h3 unbold'>QBE</span>
              </p>
              <p className='para light price-usd text-center'>
                {`$${ course.informationSection.price } USD`}
              </p>
            </Box>
            <CardMedia
              image={ course.contentSection.thumbnailImage }
              className='course-image round-border'
            />
          </Card>
        </div>
        <>
          {type !== 'preview' && (
          <div className='mb-10'>
            {!course.isEnrolled && (
            <Button
              className='wide-button'
              classes={ {
                root: 'button-primary-small',
                label: 'button-primary-small-label',
              } }
              onClick={ course.informationSection.price > 0
                ? () => setOpenBuyCoursePopup(true) : handleStartOrContinueCourse }
            >
              {course.informationSection.price > 0 ? 'Buy Course' : 'Start Course'}
            </Button>
            )}
            {course.isEnrolled && (
            <Button
              className='wide-button'
              classes={ {
                root: 'button-primary-small',
                label: 'button-primary-small-label',
              } }
              onClick={ handleStartOrContinueCourse }
            >
              {
                (course.courseDetails && course.courseDetails.status === 'enrolled' && 'Start Course')
                || (course.courseDetails && course.courseDetails.status === 'inprogress' && 'Continue Course')
              }
            </Button>
            )}
            {!course.isEnrolled && (
            <Button
              className='wide-button'
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
              onClick={ handlePreview }
            >
              Preview
            </Button>
            )}
            <Button
              className='wide-button'
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
              onClick={ () => setIsAssessmentModalOpen(true) }
            >
              Assessment Test
            </Button>
          </div>
          )}

          {openBuyCoursePopup && (
            <BuyCourseModal
              open={ openBuyCoursePopup }
              onClose={ () => setOpenBuyCoursePopup(false) }
              courseId={ course.courseId }
              title={ course.informationSection.title }
              createdOn={ course.createdOn }
              price={ course.informationSection.price }
              creatorName={ course.informationSection.creatorName }
            />
          )}

          {isAssessmentModalOpen && (
          <AssessmentTestModal
            open={ isAssessmentModalOpen }
            onClose={ () => setIsAssessmentModalOpen(false) }
            courseId={ course.courseId }
            assessmentTest={ course.assessmentTest }
          />
          )}

          {type !== 'preview' && (
          <div className='mb-20'>
            <h4 className='h4'> Rating for this course</h4>
            <div className='rating-text'>
              <Rating
                className='rating-star no-margin-left'
                name='read-only'
                readOnly
                size='small'
                value={ course.rating }
                precision={ 0.5 }
              />
              <span className='para light'>{`(${ 15 } ratings) `}</span>
              <span className='para light'>{`${ course.studentsEnrolled } students`}</span>
            </div>
          </div>
          )}

          {course.updatedOn && (
          <div className='mb-20'>
            <h4 className='h4'> Last updated</h4>
            <span className='para light'>
              {course.updatedOn && `${ formatDate(course.updatedOn, 'MMMM DD YYYY, hh:mm a') }`}
            </span>
          </div>
          )}
        </>
        {course.informationSection.category && course.informationSection.categoryTitle && (
        <div className='mb-20'>
          <h4 className='h4'>Category</h4>
          <span className='para light'>{course.informationSection.categoryTitle}</span>
        </div>
        )}
        <div className='mb-20'>
          <h4 className='h4'>Language(s)</h4>
          <span className='para light'>{course.informationSection.language}</span>
        </div>
      </Box>
    </>
  )
}

CourseActions.defaultProps = {
  type: 'view',
  isLoading: null,
  dataType: '',
}

CourseActions.propTypes = {
  course: viewCoursePropType.isRequired,
  setOpenCoursePlayer: setOpenCoursePlayerPropType.isRequired,
  type: typePropType,
  isLoading: PropTypes.bool,
  dataType: PropTypes.string,
}

export default CourseActions
