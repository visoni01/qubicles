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
  thumbnailImageRef,
}) => {
  const dispatch = useDispatch()
  const saveDraft = useCallback(() => {
    updateCourseReducer()
    dispatch(trainingCourseRequestStart({
      course: {
        informationSection,
        contentSection,
        courseContent,
        thumbnailImageFile: thumbnailImageRef.current.files && thumbnailImageRef.current.files[ 0 ],
        status: 'draft',
      },
      requestType: 'CREATE',
    }))
  }, [ informationSection, contentSection, courseContent, updateCourseReducer, thumbnailImageRef, dispatch ])

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
          onClick={ () => setIsPreview((current) => !current) }
        >
          {isPreview ? 'End Preview' : 'Preview'}
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
  informationSection: PropTypes.shape({}).isRequired,
  contentSection: PropTypes.shape({}).isRequired,
  courseContent: PropTypes.shape({}).isRequired,
  isPreview: PropTypes.bool.isRequired,
  setIsPreview: PropTypes.func.isRequired,
  thumbnailImageRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
}

export default NewCourseActions
