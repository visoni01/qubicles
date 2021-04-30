import React, { useCallback, useEffect } from 'react'
import { Box, Button, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { trainingCourseRequestStart } from '../../../../../redux-saga/redux/people'
import { EDIT_COURSE_ROUTE } from '../../../../../routes/routesPath'
import { courseContentFilterBeforeSave } from './CourseContent/helper'

const NewCourseActions = ({
  informationSection,
  contentSection,
  courseContent,
  isPreview,
  setIsPreview,
  courseId,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
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

  useEffect(() => {
    if (courseId) {
      history.push(`${ EDIT_COURSE_ROUTE }/${ courseId }`)
    }
  }, [ courseId, history ])

  return (
    <Box className='custom-box actions-box wrapper'>
      <h3 className='h3 mb-15'> Actions </h3>

      <Button
        className='wide-button'
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
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
  )
}

NewCourseActions.propTypes = {
  informationSection: PropTypes.shape({}).isRequired,
  contentSection: PropTypes.shape({}).isRequired,
  courseContent: PropTypes.shape({}).isRequired,
  isPreview: PropTypes.bool.isRequired,
  setIsPreview: PropTypes.func.isRequired,
  courseId: PropTypes.number.isRequired,
}

export default NewCourseActions
