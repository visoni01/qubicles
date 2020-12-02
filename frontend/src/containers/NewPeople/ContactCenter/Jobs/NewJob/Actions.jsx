import React from 'react'
import { Button, Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {
  addJob,
  updateJob,
  createJobDataFetchSuccessful,
  resetJobDetails,
  resetJobData,
} from '../../../../../redux-saga/redux/actions'
import '../../styles.scss'
import ROUTE_PATHS from '../../../../../routes/routesPath'

export default function CreatePreviewActions({
  newJobData, isEdit, isPreview,
}) {
  const dispatch = useDispatch()
  const history = useHistory()
  const saveDraft = () => {
    dispatch(addJob({
      ...newJobData,
      status: 'draft',
    }))
  }

  const publishJob = () => {
    if (isEdit) {
      dispatch(updateJob({ ...newJobData, status: 'recruiting' }))
      dispatch(resetJobDetails())
    } else {
      dispatch(addJob({ ...newJobData, status: 'recruiting' }))
      dispatch(resetJobData())
    }
    history.push(ROUTE_PATHS.NEW_PEOPLE)
  }

  const previewJob = () => {
    dispatch(createJobDataFetchSuccessful({ createJobData: newJobData }))
    history.push(ROUTE_PATHS.JOB_PREVIEW)
  }

  return (
    <>
      <Box className='custom-box actions-box'>
        <h3 className='h3 mb-20'> Actions </h3>
        <Button
          className='wide-button mb-15'
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
          onClick={ publishJob }
        >
          >
          Publish
        </Button>

        { !isPreview && (
        <>
          <Button
            className='wide-button mb-15'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
            onClick={ saveDraft }
          >
            Save Draft
          </Button>

          <Button
            className='wide-button mb-15'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
            onClick={ previewJob }
          >
            Preview
          </Button>
        </>
        )}

        { isPreview && (
        <Button
          className='wide-button mb-15'
          classes={ {
            root: 'button-secondary-small',
            label: 'button-secondary-small-label',
          } }
          onClick={ () => { window.history.back() } }
        >
          End Preview
        </Button>
        )}

      </Box>

    </>
  )
}

CreatePreviewActions.defaultProps = {
  isEdit: false,
  isPreview: false,
}

CreatePreviewActions.propTypes = {
  newJobData: PropTypes.shape(PropTypes.any).isRequired,
  isEdit: PropTypes.bool,
  isPreview: PropTypes.bool,
}
