import React, { useCallback } from 'react'
import { Box, Button, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { trainingCourseRequestStart } from '../../../../../redux-saga/redux/people'

const NewCourseActions = ({
  updateCourseReducer,
  informationSection,
  contentSection,
  courseContent,
  isPreview,
  setIsPreview,
  courseId,
}) => {
  const dispatch = useDispatch()
  const saveDraft = useCallback(() => {
    updateCourseReducer()
    dispatch(trainingCourseRequestStart({
      course: {
        courseId,
        informationSection,
        contentSection,
        courseContent,
        status: 'draft',
      },
      requestType: 'CREATE',
    }))
  }, [ informationSection, contentSection, courseContent, updateCourseReducer, courseId, dispatch ])

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
  updateCourseReducer: PropTypes.func.isRequired,
  informationSection: PropTypes.shape({}).isRequired,
  contentSection: PropTypes.shape({}).isRequired,
  courseContent: PropTypes.shape({}).isRequired,
  isPreview: PropTypes.bool.isRequired,
  setIsPreview: PropTypes.func.isRequired,
  courseId: PropTypes.number.isRequired,
}

export default NewCourseActions
