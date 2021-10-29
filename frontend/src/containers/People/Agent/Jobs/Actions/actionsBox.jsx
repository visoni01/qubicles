import React, { useCallback, useEffect, useState } from 'react'
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
import { jobApplicationRequestStart, allChatsRequestStart } from '../../../../../redux-saga/redux/actions'
import { REQUEST_TYPES } from '../../../../../utils/constants'
import { NEW_CHAT } from '../../../../../redux-saga/redux/constants'

const ActionsBox = ({
  application, jobId, clientId, agentUserId,
}) => {
  const [ isNewChatLoading, setIsNewChatLoading ] = useState(false)
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.jobApplication)
  const { applicationFilter } = useSelector((state) => state.agentJobApplications)
  const { jobDetails } = useSelector((state) => state.jobDetails)
  const { isLoading: isChatLoading, dataType } = useSelector((state) => state.allChats)

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
        requestType: REQUEST_TYPES.UPDATE,
      }))
    }
  }, [
    application.applicationId,
    application.jobId,
    dispatch,
    isLoading,
    getApplicationCategoryId,
  ])

  /* eslint-disable camelcase */
  const handleSendMessage = useCallback(() => {
    setIsNewChatLoading(true)
    dispatch(allChatsRequestStart({
      requestType: REQUEST_TYPES.CREATE,
      dataType: NEW_CHAT,
      candidate: {
        id: jobDetails?.userId,
        clientId: jobDetails?.clientId,
        name: jobDetails?.companyDetails?.client_name,
        profilePic: jobDetails?.companyDetails?.profile_image,
        location: `${ jobDetails?.companyDetails?.city }, ${ jobDetails?.companyDetails?.state }`,
        title: jobDetails?.companyDetails?.title,
        userCode: 'employer',
      },
      onlyPopup: true,
    }))
  }, [ dispatch, jobDetails ])

  useEffect(() => {
    if (!isChatLoading && _.isEqual(dataType, NEW_CHAT)) {
      setIsNewChatLoading(false)
    }
  }, [ isChatLoading, dataType ])

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
              handleSendMessage={ handleSendMessage }
              isNewChatLoading={ isNewChatLoading }
            />
            )}
            {[ 'declined', 'rejected', 'resigned', 'terminated' ].includes(application.status) && (
            <MessageButton handleSendMessage={ handleSendMessage } isLoading={ isNewChatLoading } />
            )}
            {[ 'screening', 'training' ].includes(application.status) && (
            <ScreeningActions
              application={ application }
              updateApplicationStatus={ updateApplicationStatus }
              handleSendMessage={ handleSendMessage }
              isNewChatLoading={ isNewChatLoading }
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

ActionsBox.defaultProps = {
  jobId: null,
  clientId: null,
  agentUserId: null,
}

ActionsBox.propTypes = {
  jobId: PropTypes.number,
  clientId: PropTypes.number,
  agentUserId: PropTypes.number,
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
export default ActionsBox
