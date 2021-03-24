import React, { useCallback } from 'react'
import { Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ApplyJobAction from './applyJobAction'
import WithdrawApplication from './withdrawApplication'
import InvitedActions from './invitedActions'
import MessageButton from './messageButton'
import ScreeningActions from './screeningActions'
import HiredActions from './hiredActions'
import OfferedActions from './offeredActions'
import { jobApplicationRequestStart } from '../../../../../redux-saga/redux/actions'

const ActionsBox = ({
  application, jobId, clientId, agentUserId,
}) => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.jobApplication)
  const { applicationFilter } = useSelector((state) => state.agentJobApplications)

  const getApplicationCategoryId = useCallback(() => parseInt(Object.keys(applicationFilter).filter(
    (key) => applicationFilter[ key ].statusTypes.includes(application.status),
  )[ 0 ], 10),
  [ applicationFilter, application ])

  const updateApplicationStatus = useCallback((status) => {
    if (!isLoading) {
      dispatch(jobApplicationRequestStart({
        applicationData: {
          applicationId: application.applicationId,
          applicationCategoryId: getApplicationCategoryId(),
          userType: 'agent',
          jobId: application.jobId,
          status,
        },
        requestType: 'UPDATE',
      }))
    }
  }, [
    application.applicationId,
    application.jobId,
    dispatch,
    isLoading,
    getApplicationCategoryId,
  ])
  return (
    <Box className='custom-box actions-box'>
      <h3 className=' h3 mb-10'> Actions </h3>
      {_.isEmpty(application) ? (
        <>
          <ApplyJobAction
            agentUserId={ agentUserId }
            clientId={ clientId }
            jobId={ jobId }
          />
        </>
      ) : (
        <div>
          {application.status === 'invited' && (
          <p className='para'>
            You have been invited for this job by the employer. Accepting the invitation allows you
            skip the application process.
          </p>
          )}
          <div className='mt-20'>
            {[ 'applied' ].includes(application.status) && (
            <WithdrawApplication
              updateApplicationStatus={ updateApplicationStatus }
              application={ application }
            />
            )}
            {[ 'invited' ].includes(application.status) && (
            <InvitedActions
              updateApplicationStatus={ updateApplicationStatus }
            />
            )}
            {[ 'declined', 'rejected', 'resigned', 'terminated' ].includes(application.status) && (
            <MessageButton />
            )}
            {[ 'screening', 'training' ].includes(application.status) && (
            <ScreeningActions
              updateApplicationStatus={ updateApplicationStatus }
              application={ application }
            />
            )}
            {[ 'hired' ].includes(application.status) && (
            <HiredActions
              updateApplicationStatus={ updateApplicationStatus }
            />
            )}
            {[ 'offered' ].includes(application.status) && (
            <OfferedActions
              updateApplicationStatus={ updateApplicationStatus }
            />
            )}
          </div>
        </div>
      )}
    </Box>
  )
}

ActionsBox.propTypes = {
  jobId: PropTypes.number.isRequired,
  clientId: PropTypes.number.isRequired,
  agentUserId: PropTypes.number.isRequired,
  application: PropTypes.shape({
    applicationId: PropTypes.number.isRequired,
    agentUserId: PropTypes.number.isRequired,
    clientId: PropTypes.number.isRequired,
    jobId: PropTypes.number.isRequired,
    coverLetter: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdOn: PropTypes.string.isRequired,
    updateOn: PropTypes.string.isRequired,
  }).isRequired,
}
export default ActionsBox
