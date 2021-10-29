import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import { resetTrainingCourseReducer, trainingCourseRequestStart } from '../../../../../redux-saga/redux/people'
import ROUTES_PATH, { EDIT_COURSE_ROUTE } from '../../../../../routes/routesPath'
import { courseContentFilterBeforeSave, formatRequiredCoursesData } from './CourseContent/helper'
import { contentSectionPropType, courseContentPropType, informationSectionPropType } from './propTypes'
import ConfirmationModal from '../../../../../components/CommonModal/confirmationModal'
import { REQUEST_TYPES } from '../../../../../utils/constants'

const NewCourseActions = ({
  informationSection, contentSection, courseContent, isPreview, setIsPreview, courseId, courseStatus, handleErrors,
  requestType, success,
}) => {
  const [ publishConfirmationOpen, setPublishConfirmationOpen ] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (courseId && courseStatus === 'draft' && history.location.pathname !== `${ EDIT_COURSE_ROUTE }/${ courseId }`) {
      history.push(`${ EDIT_COURSE_ROUTE }/${ courseId }`)
    }
    if (success && requestType !== REQUEST_TYPES.FETCH && courseId && courseStatus === 'published') {
      history.push(`${ ROUTES_PATH.MY_COURSES }`)
      dispatch(resetTrainingCourseReducer())
    }
  }, [ courseId, history, courseStatus, dispatch, requestType, success ])

  const saveDraft = useCallback(() => {
    // Check course content before send
    const courseContentFiltered = courseContentFilterBeforeSave({ courseContent })
    const formattedRequiredCoursesData = formatRequiredCoursesData({
      requiredCourses: informationSection.requiredCourses,
    })
    const updatedInformationSection = {
      ...informationSection,
      title: informationSection.title.trim(),
      description: informationSection.description.trim(),
      goals: informationSection.goals.trim(),
      outcomes: informationSection.outcomes.trim(),
      requirements: informationSection.requirements.trim(),
      requiredCourses: formattedRequiredCoursesData,
    }
    const course = {
      courseId,
      informationSection: updatedInformationSection,
      contentSection,
      courseContent: courseContentFiltered,
      status: 'draft',
    }

    if (course.courseId) {
      dispatch(trainingCourseRequestStart({
        course,
        requestType: REQUEST_TYPES.UPDATE,
      }))
    } else {
      dispatch(trainingCourseRequestStart({
        course,
        requestType: REQUEST_TYPES.CREATE,
      }))
    }
  }, [ informationSection, contentSection, courseContent, courseId, dispatch ])

  const onPublish = useCallback(() => {
    if (!handleErrors()) {
      setPublishConfirmationOpen(true)
    } else if (isPreview) {
      setIsPreview(false)
    }
  }, [ handleErrors, isPreview, setIsPreview ])

  const publishCourse = useCallback(() => {
    // Check course content before send
    const courseContentFiltered = courseContentFilterBeforeSave({ courseContent })
    const formattedRequiredCoursesData = formatRequiredCoursesData({
      requiredCourses: informationSection.requiredCourses,
    })
    const updatedInformationSection = {
      ...informationSection,
      title: informationSection.title.trim(),
      description: informationSection.description.trim(),
      goals: informationSection.goals.trim(),
      outcomes: informationSection.outcomes.trim(),
      requirements: informationSection.requirements.trim(),
      requiredCourses: formattedRequiredCoursesData,
    }

    const course = {
      courseId,
      informationSection: updatedInformationSection,
      contentSection,
      courseContent: courseContentFiltered,
      status: 'published',
    }

    if (course.courseId) {
      dispatch(trainingCourseRequestStart({
        course,
        requestType: REQUEST_TYPES.UPDATE,
      }))
    } else {
      dispatch(trainingCourseRequestStart({
        course,
        requestType: REQUEST_TYPES.CREATE,
      }))
    }
  }, [ informationSection, contentSection, courseContent, courseId, dispatch ])

  return (
    <>
      <Box className='custom-box actions-box wrapper'>
        <h3 className='h3 mb-15'> Actions </h3>

        <Button
          className='wide-button'
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
          onClick={ onPublish }
        >
          Publish
        </Button>
        <Button
          className='wide-button'
          classes={ {
            root: 'button-secondary-small',
            label: 'button-secondary-small-label',
          } }
          onClick={ () => setIsPreview((current) => !current) }
        >
          {isPreview ? 'End Preview' : 'Preview'}
        </Button>
        {!_.isEqual(courseStatus, 'published') && (
          <>
            <Divider className='divider-padded' />
            <Button
              className='wide-button'
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
              onClick={ saveDraft }
            >
              Save Draft
            </Button>
          </>
        )}
      </Box>
      <ConfirmationModal
        open={ publishConfirmationOpen }
        confirmButtonText='Publish'
        handleClose={ () => setPublishConfirmationOpen(false) }
        handleConfirm={ publishCourse }
        message='Are you sure you want to publish this course?'
      />
    </>
  )
}

NewCourseActions.defaultProps = {
  courseId: null,
  courseStatus: '',
  requestType: '',
  success: false,
}

NewCourseActions.propTypes = {
  informationSection: informationSectionPropType.isRequired,
  contentSection: contentSectionPropType.isRequired,
  courseContent: courseContentPropType.isRequired,
  isPreview: PropTypes.bool.isRequired,
  setIsPreview: PropTypes.func.isRequired,
  courseId: PropTypes.number,
  courseStatus: PropTypes.string,
  handleErrors: PropTypes.func.isRequired,
  requestType: PropTypes.string,
  success: PropTypes.bool,
}

export default NewCourseActions
