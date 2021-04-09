import React, { useCallback } from 'react'
import { Box, Button, Divider } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import ROUTE_PATHS from '../../../../../routes/routesPath'
import { trainingCourseRequestStart } from '../../../../../redux-saga/redux/people'

const NewCourseActions = ({
  updateCourseReducer,
  informationDetails,
  contentDetails,
  courseContent,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const handlePreviewCourse = useCallback(() => {
    updateCourseReducer()
    history.push(ROUTE_PATHS.PREVIEW_COURSE)
  }, [ updateCourseReducer, history ])

  const saveDraft = useCallback(() => {
    updateCourseReducer()
    dispatch(trainingCourseRequestStart({
      course: {
        informationSection: informationDetails,
        contentSection: contentDetails,
        courseContent,
        status: 'draft',
      },
      requestType: 'CREATE',
    }))
  }, [ informationDetails, contentDetails, courseContent, updateCourseReducer, dispatch ])

  return (
    <Box className='custom-box actions-box wrapper'>
      <h3 className='h3 mb-15'> Actions </h3>
      <div className='mb-10'>
        <Button
          className='wide-button'
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          Publish
        </Button>
      </div>
      <div className='mb-10'>
        <Button
          className='wide-button'
          classes={ {
            root: 'button-secondary-small',
            label: 'button-secondary-small-label',
          } }
          onClick={ handlePreviewCourse }
        >
          Preview
        </Button>
      </div>
      <Divider className='divider-padded' />
      <div className='mb-10'>
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
      </div>
    </Box>
  )
}

NewCourseActions.propTypes = {
  updateCourseReducer: PropTypes.func.isRequired,
  informationDetails: PropTypes.shape({}).isRequired,
  contentDetails: PropTypes.shape({}).isRequired,
  courseContent: PropTypes.shape({}).isRequired,
}

export default NewCourseActions
