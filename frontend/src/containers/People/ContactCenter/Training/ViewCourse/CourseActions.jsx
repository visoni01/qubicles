/* eslint-disable complexity */
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
import {
  setOpenCoursePlayerPropType, viewCoursePropType, typePropType, dataTypePropType,
} from './propTypes'
import { startLoader, stopLoader } from '../../../../../redux-saga/redux/utils'
import CourseActionSkeleton from
  '../../../../../components/People/ContactCenter/SkeletonLoader/Training/courseActionSkeleton'
import { EDIT_COURSE_ROUTE } from '../../../../../routes/routesPath'
import IncompleteCoursesList from './incompleteCoursesList'
import { REQUEST_TYPES } from '../../../../../utils/constants'
import {
  BUY_COURSE, COURSE_INFO, COURSE_UNIT, START_COURSE,
} from '../../../../../redux-saga/redux/constants'
import CourseBadge from '../../../../../components/CommonModal/courseBadge'

const CourseActions = ({
  course, setOpenCoursePlayer, type, isLoading, dataType, continueCourse, setOpenReviewModal, requestType,
}) => {
  const [ isAssessmentModalOpen, setIsAssessmentModalOpen ] = useState(false)
  const [ openBuyCoursePopup, setOpenBuyCoursePopup ] = useState(false)

  const { addReviewAccess } = useSelector((state) => state.courseRatings)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (dataType === BUY_COURSE && isLoading) {
      dispatch(startLoader())
    }
    if (dataType === BUY_COURSE && isLoading === false) {
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
        requestType: REQUEST_TYPES.FETCH,
        dataType: START_COURSE,
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
            requestType: REQUEST_TYPES.UPDATE,
            dataType: COURSE_UNIT,
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
          requestType: REQUEST_TYPES.UPDATE,
          dataType: COURSE_UNIT,
          courseId: course.courseId,
          sectionId: course.courseContent.sections[ sectionIndex ].id,
          unitId: course.courseContent.sections[ sectionIndex ].units[ unitIndex ].unitId,
          status: course.courseContent.sections[ sectionIndex ].units[ unitIndex ].status === 'completed'
            ? 'completed' : 'inprogress',
        }))
      }
    } else if (course.courseDetails.status === 'completed') {
      dispatch(updateCurrentUnitAndSectionIndex({
        currentSectionIndex: 0,
        currentUnitIndex: 0,
        isIntroVideoActive: false,
      }))
      dispatch(viewCourseRequestStart({
        requestType: REQUEST_TYPES.UPDATE,
        dataType: COURSE_UNIT,
        courseId: course.courseId,
        sectionId: course.courseContent.sections[ 0 ].id,
        unitId: course.courseContent.sections[ 0 ].units[ 0 ].unitId,
        status: course.courseContent.sections[ 0 ].units[ 0 ].status === 'completed' ? 'completed' : 'inprogress',
      }))
    }
    setOpenCoursePlayer(true)
  }, [ course.isEnrolled, course.courseDetails, course.courseId, dispatch, setOpenCoursePlayer,
    course.informationSection.price, course.courseContent.sections ])

  const getCourseGradingStatus = useCallback(({ grade }) => {
    let status = 'Poor'

    if (grade > 90) {
      status = 'Excellent'
    } else if (grade > 75 && grade <= 90) {
      status = 'Good'
    } else if (grade > 60 && grade <= 75) {
      status = 'Above average'
    } else if (grade > 33 && grade <= 60) {
      status = 'Average'
    }

    return status
  }, [])

  useEffect(() => {
    if (continueCourse && _.isEqual(type, 'view')
    && !(_.isNull(isLoading) || isLoading) && (_.isEmpty(dataType) || _.isEqual(dataType, COURSE_INFO))) {
      handleStartOrContinueCourse()
    }
  }, [ continueCourse, dataType, handleStartOrContinueCourse, isLoading, type ])

  if (_.isEqual(type, 'view')
    && (_.isNull(isLoading) || isLoading) && (_.isEmpty(dataType) || _.isEqual(dataType, COURSE_INFO))) {
    return (
      <CourseActionSkeleton />
    )
  }

  return (
    <Box className='custom-box actions-box'>
      <div className='mb-20'>
        <Card className='course-card'>
          {(_.isEqual(type, 'preview') || !course.isEnrolled) && (
            <Box className='custom-box no-padding price-overlay'>
              <p className='h3 price-qbe text-center'>
                { `${ course.informationSection.price } `}
                <span className='h3 unbold'> QBE </span>
              </p>
              <p className='para light price-usd text-center'>
                {`$${ course.informationSection.price } USD`}
              </p>
            </Box>
          )}
          {_.isEqual(type, 'view') && course.isEnrolled && (
            <Box className='custom-box no-padding progress-overlay'>
              <p className='h3 progress-text'>
                {course.courseContent.sections && course.courseContent.sections.length > 0
                    && `${ Math.round((course.sectionsCompleted * 100) / course.courseContent.sections.length) }%`}
              </p>
            </Box>
          )}
          <CardMedia
            image={ course.contentSection.thumbnailImage }
            className='course-image round-border'
          />
        </Card>
      </div>
      <>
        {type !== 'preview' && (
          <div className='mb-10'>
            {!course.isCreator && (
              <>
                {!course.isEnrolled && (
                  <Button
                    className='wide-button'
                    classes={ {
                      root: 'button-primary-small',
                      label: 'button-primary-small-label',
                    } }
                    onClick={ course.informationSection.price > 0
                      ? () => setOpenBuyCoursePopup(true) : handleStartOrContinueCourse }
                    disabled={ !course.canBuy }
                  >
                    {course.informationSection.price > 0 ? 'Buy Course' : 'Start Course'}
                  </Button>
                )}
                {!course.canBuy && course.informationSection && course.informationSection.requiredCourses
                  .filter((requiredCourse) => requiredCourse.status !== 'completed').length > 0 && (
                  <IncompleteCoursesList
                    className='mb-15'
                    requiredCourses={ course.informationSection.requiredCourses }
                  />
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
                    || (course.courseDetails && course.courseDetails.status === 'completed' && 'View Course')
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
                {course.isEnrolled && course.courseDetails.status !== 'completed' && (
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
                )}
                {course.courseDetails.status === 'completed' && addReviewAccess && (
                  <Button
                    className='wide-button'
                    classes={ {
                      root: 'button-secondary-small',
                      label: 'button-secondary-small-label',
                    } }
                    onClick={ () => setOpenReviewModal(true) }
                  >
                    Write A Review
                  </Button>
                )}
              </>
            )}
            {course.isCreator && (
              <>
                <Button
                  className='wide-button'
                  classes={ {
                    root: 'button-primary-small',
                    label: 'button-primary-small-label',
                  } }
                  onClick={ handlePreview }
                >
                  View Course
                </Button>
                {course.canEdit && (
                  <Button
                    className='wide-button'
                    classes={ {
                      root: 'button-secondary-small',
                      label: 'button-secondary-small-label',
                    } }
                    onClick={ () => history.push(`${ EDIT_COURSE_ROUTE }/${ course.courseId }`) }
                  >
                    Edit Course
                  </Button>
                )}
              </>
            )}
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
            isLoading={ isLoading }
            requestType={ requestType }
          />
        )}

        {type !== 'preview' && !course.isCreator && course.courseDetails
        && _.isEqual(course.courseDetails.status, 'completed')
        && (_.isNull(course.courseDetails.grade) || _.isUndefined(course.courseDetails.grade)) && (
          <p className='para mb-20'> Your result is being evaluated. Please wait for your result. Thanks! </p>
        )}

        {type !== 'preview' && !course.isCreator && course.courseDetails
        && _.isEqual(course.courseDetails.status, 'completed')
        && !(_.isNull(course.courseDetails.grade) || _.isUndefined(course.courseDetails.grade)) && (
          <div className='is-flex is-between align-items-start mb-20'>
            <div>
              <h4 className='h4'> Your Certificate </h4>
              <span className='para light'>{ getCourseGradingStatus({ grade: course.courseDetails.grade }) }</span>
            </div>
            <div className='is-flex is-between align-items-center'>
              <CourseBadge grade={ course.courseDetails.grade } />
              <Button
                className='ml-20'
                classes={ {
                  root: 'button-secondary-small',
                  label: 'button-secondary-small-label',
                } }
              >
                View
              </Button>
            </div>
          </div>
        )}

        {type !== 'preview' && (
          <div className='mb-20'>
            <h4 className='h4'> Rating for this course </h4>
            <div className='rating-text'>
              <Rating
                className='rating-star no-margin-left'
                name='read-only'
                readOnly
                size='small'
                value={ course.rating }
                precision={ 0.5 }
              />
              <span className='para light'>{`(${ course.totalRaters } ratings) `}</span>
              <span className='para light'>{`${ course.studentsEnrolled } students`}</span>
            </div>
          </div>
        )}

        {course.createdOn && (
          <div className='mb-20'>
            <h4 className='h4'> Last updated </h4>
            <span className='para light'>
              {course.createdOn && `${ formatDate(course.createdOn, 'MMMM DD YYYY, hh:mm a') }`}
            </span>
          </div>
        )}
      </>
      {course.informationSection.category && course.informationSection.categoryTitle && (
        <div className='mb-20'>
          <h4 className='h4'> Category </h4>
          <span className='para light'>{course.informationSection.categoryTitle}</span>
        </div>
      )}
      <div className='mb-20'>
        <h4 className='h4'> Language(s) </h4>
        <span className='para light'>{course.informationSection.language}</span>
      </div>
    </Box>
  )
}

CourseActions.defaultProps = {
  type: 'view',
  isLoading: null,
  dataType: '',
  continueCourse: false,
  requestType: '',
  setOpenReviewModal: () => {},
  setOpenCoursePlayer: () => {},
}

CourseActions.propTypes = {
  course: viewCoursePropType.isRequired,
  setOpenCoursePlayer: setOpenCoursePlayerPropType,
  type: typePropType,
  isLoading: PropTypes.bool,
  dataType: dataTypePropType,
  continueCourse: PropTypes.bool,
  setOpenReviewModal: PropTypes.func,
  requestType: PropTypes.string,
}

export default CourseActions
