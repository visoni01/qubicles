import React, { useCallback, useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import AppliedInvitedActions from './appliedInvitedActions'
import ScreeningActions from './screeningActions'
import LeftJobActions from './leftJobActions'
import TrainingActions from './trainingActions'
import OfferedActions from './offeredActions'
import { jobApplicationRequestStart, allChatsRequestStart } from '../../../../../redux-saga/redux/actions'
import HiredActions from './hiredActions'
import '../../styles.scss'

const ClientJobApplicationActions = ({
  application, candidateId, candidateName, profileName, profileImage, location,
}) => {
  const [ isNewChatLoading, setIsNewChatLoading ] = useState(false)
  const { isLoading, dataType } = useSelector((state) => state.allChats)
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

  const handleSendMessage = useCallback(() => {
    setIsNewChatLoading(true)
    dispatch(allChatsRequestStart({
      requestType: 'CREATE',
      dataType: 'new-chat',
      candidate: {
        id: candidateId,
        name: candidateName,
        profilePic: profileImage,
        location,
        title: profileName,
        userCode: 'agent',
      },
      onlyPopup: true,
    }))
  }, [ dispatch, candidateId, candidateName, profileName, profileImage, location ])

  useEffect(() => {
    if (!isLoading && dataType === 'new-chat') {
      setIsNewChatLoading(false)
    }
  }, [ isLoading, dataType ])

  return (
    <>
      <Box className='custom-box actions-box'>
        <h3 className='h3 mb-30'> Actions </h3>
        { [ 'applied', 'invited' ].includes(application.status) && (
        <AppliedInvitedActions
          key={ application.applicationId }
          handleUpdateStatus={ handleUpdateStatus }
          handleSendMessage={ handleSendMessage }
          isNewChatLoading={ isNewChatLoading }
        />
        ) }
        { application.status === ('screening') && (
        <ScreeningActions
          key={ application.applicationId }
          handleUpdateStatus={ handleUpdateStatus }
          handleSendMessage={ handleSendMessage }
          isNewChatLoading={ isNewChatLoading }
        />
        ) }
        { application.status === ('training') && (
        <TrainingActions
          key={ application.applicationId }
          handleUpdateStatus={ handleUpdateStatus }
          handleSendMessage={ handleSendMessage }
          isNewChatLoading={ isNewChatLoading }
        />
        ) }
        { application.status === ('offered') && (
        <OfferedActions
          key={ application.applicationId }
          handleUpdateStatus={ handleUpdateStatus }
          handleSendMessage={ handleSendMessage }
          isNewChatLoading={ isNewChatLoading }
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
          handleSendMessage={ handleSendMessage }
          isNewChatLoading={ isNewChatLoading }
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
  candidateId: PropTypes.number,
  candidateName: PropTypes.string,
  location: PropTypes.string,
  profileName: PropTypes.string,
  profileImage: PropTypes.string,
}

ClientJobApplicationActions.defaultProps = {
  candidateId: null,
  candidateName: '',
  location: '',
  profileName: '',
  profileImage: '',
}

export default ClientJobApplicationActions
