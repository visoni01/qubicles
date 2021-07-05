import React, { useEffect } from 'react'
import { Button, Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  addJob,
  updateJob,
  createJobDataFetchSuccessful,
  resetJobDetails,
  resetJobData,
  resetJobPublishStatus,
} from '../../../../../redux-saga/redux/actions'
import '../../styles.scss'
import ROUTE_PATHS, { JOB_ROUTE } from '../../../../../routes/routesPath'
import { jobDetailsPropTypes } from '../jobsValidator'

const CreatePreviewActions = ({
  newJobData, isEdit, isPreview, handleErrors,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const saveDraft = () => {
    if (handleErrors({ status: 'draft' })) {
      return
    }
    dispatch(addJob({
      ...newJobData,
      status: 'draft',
    }))
  }

  const { publishedJobId, jobPublishSuccess } = useSelector((state) => state.createJobData)

  useEffect(() => {
    if (jobPublishSuccess && publishedJobId) {
      history.push(`${ JOB_ROUTE }/${ publishedJobId }`)
      dispatch(resetJobPublishStatus())
    }
  }, [ jobPublishSuccess, publishedJobId, dispatch, history ])

  const publishJob = () => {
    if (handleErrors({ status: 'recruiting' })) {
      return
    }
    if (isEdit) {
      dispatch(updateJob({ ...newJobData, status: 'recruiting' }))
      dispatch(resetJobDetails())
      dispatch(resetJobData())
    } else {
      dispatch(addJob({ ...newJobData, status: 'recruiting' }))
      dispatch(resetJobData())
    }
  }

  const previewJob = () => {
    dispatch(createJobDataFetchSuccessful({ createJobData: newJobData, isUpdatedData: isEdit }))
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
          {isEdit ? '> Update' : '> Publish'}
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
  newJobData: null,
}

CreatePreviewActions.propTypes = {
  newJobData: jobDetailsPropTypes,
  isEdit: PropTypes.bool,
  isPreview: PropTypes.bool,
  handleErrors: PropTypes.func.isRequired,
}

export default CreatePreviewActions
