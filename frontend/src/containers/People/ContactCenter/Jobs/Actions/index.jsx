import React, { useCallback } from 'react'
import { Box } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import AppliedInvitedActions from './appliedInvitedActions'
import ScreeningActions from './screeningActions'
import LeftJobActions from './leftJobActions'
import TrainingActions from './trainingActions'
import OfferedActions from './offeredActions'
import { jobApplicationRequestStart } from '../../../../../redux-saga/redux/actions'
import HiredActions from './hiredActions'
import '../../styles.scss'

const ClientJobApplicationActions = ({ application }) => {
  const dispatch = useDispatch()

  const handleUpdateStatus = useCallback((status) => {
    dispatch(jobApplicationRequestStart({
      applicationData: {
        applicationId: application.applicationId,
        jobId: application.jobId,
        status,
      },
      requestType: 'UPDATE',
    }))
  }, [ dispatch, application ])

  return (
    <>
      <Box className='custom-box actions-box'>
        <h3 className='h3 mb-30'> Actions </h3>
        { [ 'applied', 'invited' ].includes(application.status) && (
        <AppliedInvitedActions
          key={ application.applicationId }
          handleUpdateStatus={ handleUpdateStatus }
        />
        ) }
        { application.status === ('screening') && (
        <ScreeningActions
          key={ application.applicationId }
          handleUpdateStatus={ handleUpdateStatus }
        />
        ) }
        { application.status === ('training') && (
        <TrainingActions
          key={ application.applicationId }
          handleUpdateStatus={ handleUpdateStatus }
        />
        ) }
        { application.status === ('offered') && (
        <OfferedActions
          key={ application.applicationId }
          handleUpdateStatus={ handleUpdateStatus }
        />
        ) }
        { application.status === ('hired') && (
        <HiredActions
          key={ application.applicationId }
          handleUpdateStatus={ handleUpdateStatus }
        />
        ) }
        { [ 'declined', 'terminated', 'rejected', 'resigned' ].includes(application.status) && (
        <LeftJobActions
          key={ application.applicationId }
          application={ application }
          handleUpdateStatus={ handleUpdateStatus }
        />
        ) }
      </Box>
    </>
  )
}

ClientJobApplicationActions.propTypes = {
  application: PropTypes.shape({
    applicationId: PropTypes.number,
    agentUserId: PropTypes.number,
    clientId: PropTypes.number,
    jobId: PropTypes.number,
    coverLetter: PropTypes.string,
    status: PropTypes.string,
    createdOn: PropTypes.string,
    updateOn: PropTypes.string,
  }).isRequired,
}

export default ClientJobApplicationActions
