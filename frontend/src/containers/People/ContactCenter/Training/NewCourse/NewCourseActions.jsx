import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { resetTrainingCourseReducer, trainingCourseRequestStart } from '../../../../../redux-saga/redux/people'
import ROUTES_PATH, { EDIT_COURSE_ROUTE } from '../../../../../routes/routesPath'
import { courseContentFilterBeforeSave } from './CourseContent/helper'
import { contentSectionPropType, courseContentPropType, informationSectionPropType } from './propTypes'
import ConfirmationModal from '../../../../../components/CommonModal/confirmationModal'

const NewCourseActions = ({
  informationSection,
  contentSection,
  courseContent,
  isPreview,
  setIsPreview,
  courseId,
  courseStatus,
  handleErrors,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [ publishConfirmationOpen, setPublishConfirmationOpen ] = useState(false)

  const saveDraft = useCallback(() => {
    // Check course content before send
    const courseContentFiltered = courseContentFilterBeforeSave({ courseContent })
    const course = {
      courseId,
      informationSection,
      contentSection,
      courseContent: courseContentFiltered,
      status: 'draft',
    }

    if (course.courseId) {
      dispatch(trainingCourseRequestStart({
        course,
        requestType: 'UPDATE',
      }))
    } else {
      dispatch(trainingCourseRequestStart({
        course,
        requestType: 'CREATE',
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
    const course = {
      courseId,
      informationSection,
      contentSection,
      courseContent: courseContentFiltered,
      status: 'published',
    }

    if (course.courseId) {
      dispatch(trainingCourseRequestStart({
        course,
        requestType: 'UPDATE',
      }))
    } else {
      dispatch(trainingCourseRequestStart({
        course,
        requestType: 'CREATE',
      }))
    }
  }, [ informationSection, contentSection, courseContent, courseId, dispatch ])

  useEffect(() => {
    if (courseId && courseStatus === 'draft') {
      history.push(`${ EDIT_COURSE_ROUTE }/${ courseId }`)
    }
    if (courseId && courseStatus === 'published') {
      history.push(`${ ROUTES_PATH.VIEW_COURSE }`)
      dispatch(resetTrainingCourseReducer())
    }
  }, [ courseId, history, courseStatus, dispatch ])

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
      </Box>
      <ConfirmationModal
        open={ publishConfirmationOpen }
        confirmButtonText='Publish'
        handleClose={ () => setPublishConfirmationOpen(false) }
        handleConfirm={ publishCourse }
        message='You will not be able to edit this course once it is published. Do you want to publish this course?'
      />
    </>
  )
}

NewCourseActions.defaultProps = {
  courseId: null,
  courseStatus: '',
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
}

export default NewCourseActions
