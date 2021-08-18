import React, { useCallback, useEffect } from 'react'
import { Button, Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  addJob,
  updateJob,
  createJobDataFetchSuccessful,
  resetJobDetails,
  resetJobData,
  resetJobPublishStatus,
  startLoader,
} from '../../../../../redux-saga/redux/actions'
import '../../styles.scss'
import ROUTE_PATHS, { JOB_ROUTE } from '../../../../../routes/routesPath'
import { jobDetailsPropTypes } from '../jobsValidator'

const CreatePreviewActions = ({
  newJobData, isEdit, isPreview, handleErrors,
}) => {
  const { publishedJobId, jobPublishSuccess } = useSelector((state) => state.createJobData)
  const { jobDetails } = useSelector((state) => state.jobDetails)

  const dispatch = useDispatch()
  const history = useHistory()

  const saveDraft = useCallback(() => {
    if (handleErrors({ status: 'draft' })) {
      return
    }
    dispatch(startLoader())
    if (isEdit) {
      dispatch(updateJob({
        ...newJobData,
        status: 'draft',
      }))
      dispatch(resetJobDetails())
      dispatch(resetJobData())
    } else {
      dispatch(addJob({
        ...newJobData,
        status: 'draft',
      }))
      dispatch(resetJobData())
    }
  }, [ dispatch, isEdit, newJobData, handleErrors ])

  useEffect(() => {
    if (jobPublishSuccess && publishedJobId) {
      history.push(`${ JOB_ROUTE }/${ publishedJobId }`)
      dispatch(resetJobPublishStatus())
    }
  }, [ jobPublishSuccess, publishedJobId, dispatch, history ])

  const publishJob = useCallback(() => {
    if (handleErrors({ status: 'recruiting' })) {
      return
    }
    dispatch(startLoader())
    if (isEdit) {
      dispatch(updateJob({
        ...newJobData,
        status: 'recruiting',
        isUpdated: jobDetails && jobDetails.status !== 'draft',
      }))
      dispatch(resetJobDetails())
      dispatch(resetJobData())
    } else {
      dispatch(addJob({
        ...newJobData,
        status: 'recruiting',
      }))
      dispatch(resetJobData())
    }
  }, [ dispatch, isEdit, newJobData, handleErrors, jobDetails ])

  const previewJob = () => {
    dispatch(createJobDataFetchSuccessful({ createJobData: newJobData, isUpdatedData: isEdit }))
    history.push(ROUTE_PATHS.JOB_PREVIEW)
  }

  return (
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
        {!_.isEmpty(jobDetails) && jobDetails.status !== 'draft' ? 'Update' : 'Publish'}
      </Button>

      {!isPreview && (
        <>
          {jobDetails && jobDetails.status !== 'recruiting'
          && (
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
          )}

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

      {isPreview && (
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
  )
}

CreatePreviewActions.defaultProps = {
  isEdit: false,
  isPreview: false,
  newJobData: null,
}

CreatePreviewActions.propTypes = {
  newJobData: jobDetailsPropTypes,
  isEdit: PropTypes.bool,
  isPreview: PropTypes.bool,
  handleErrors: PropTypes.func.isRequired,
}

export default CreatePreviewActions
