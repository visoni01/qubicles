import React from 'react'
import { Button, Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { addJob, updateJob } from '../../../../../redux-saga/redux/actions'
import '../../styles.scss'
import ROUTE_PATHS from '../../../../../routes/routesPath'

export default function NewJobActions({
  newJobData, isEdit,
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
      dispatch(updateJob({ ...newJobData, jobId: 1 }))
    } else { dispatch(addJob(newJobData)) }
    history.push(ROUTE_PATHS.NEW_PEOPLE)
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
        >
          Preview
        </Button>
      </Box>

    </>
  )
}

NewJobActions.propTypes = {
  newJobData: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
}
