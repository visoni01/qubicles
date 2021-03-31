import React, { useCallback } from 'react'
import { Box, Button, Divider } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import ROUTE_PATHS from '../../../../../routes/routesPath'

const NewCourseActions = ({
  updateCourseReducer,
}) => {
  const history = useHistory()
  const handlePreviewCourse = useCallback(() => {
    updateCourseReducer()
    history.push(ROUTE_PATHS.PREVIEW_COURSE)
  }, [ updateCourseReducer, history ])

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
        >
          Save Draft
        </Button>
      </div>
    </Box>
  )
}

NewCourseActions.propTypes = {
  updateCourseReducer: PropTypes.func.isRequired,
}

export default NewCourseActions
