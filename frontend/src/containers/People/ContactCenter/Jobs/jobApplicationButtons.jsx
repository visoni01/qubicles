/* eslint-disable complexity */
import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  startLoader,
  stopLoader,
  jobApplicationListRequestStart,
  allChatsRequestStart,
} from '../../../../redux-saga/redux/actions'

const JobApplicationButtons = ({ application, userDetails }) => {
  const [ isNewChatLoading, setIsNewChatLoading ] = useState(false)
  const { isLoading: isChatLoading, dataType } = useSelector((state) => state.allChats)
  const { isLoading } = useSelector((state) => state.jobApplication)
  const dispatch = useDispatch()

  const handleUpdateStatus = useCallback((status) => {
    dispatch(jobApplicationListRequestStart({
      applicationListData: {
        applicationId: application.applicationId,
        jobId: application.jobId,
        status,
      },
      requestType: 'UPDATE',
    }))
  }, [ dispatch, application ])

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoader())
    } else {
      dispatch(stopLoader())
    }
  }, [ isLoading, dispatch ])

  const handleActionButton = useCallback(({ status, actionType }) => {
    if (actionType === 'negative') {
      if ([ 'applied', 'invited' ].includes(status)) {
        handleUpdateStatus('rejected')
      }
      if ([ 'screening', 'training', 'offered' ].includes(status)) {
        handleUpdateStatus('declined')
      }
      if ([ 'hired' ].includes(status)) {
        handleUpdateStatus('terminated')
      }
    }

    if (actionType === 'primary') {
      if ([ 'applied', 'invited' ].includes(status)) {
        handleUpdateStatus('screening')
      }
      if (status === 'screening') {
        handleUpdateStatus('training')
      }
      if (status === 'training') {
        handleUpdateStatus('offered')
      }
      if (status === 'offered') {
        handleUpdateStatus('hired')
      }
      if (status === 'terminated') {
        handleUpdateStatus('offered')
      }
      if (status === 'declined') {
        handleUpdateStatus('invited')
      }
    }
  }, [ handleUpdateStatus ])

  const handleSendMessage = useCallback(() => {
    setIsNewChatLoading(true)
    dispatch(allChatsRequestStart({
      requestType: 'CREATE',
      dataType: 'new-chat',
      candidate: {
        id: application.agentUserId,
        name: userDetails?.fullName,
        profilePic: userDetails?.profileImage,
        location: userDetails?.location,
        title: userDetails?.title,
        userCode: 'agent',
      },
      onlyPopup: true,
    }))
  }, [ dispatch, userDetails, application ])

  useEffect(() => {
    if (!isChatLoading && dataType === 'new-chat') {
      setIsNewChatLoading(false)
    }
  }, [ isChatLoading, dataType ])

  return (
    <>
      {/* Button for Negative Actions */}
      <div className='pending-application-buttons mt-15'>
        {[ 'applied', 'invited', 'screening', 'training', 'hired', 'offered' ].includes(application.status)
        && (
        <Button
          classes={ {
            root: 'button-secondary-small-red',
            label: 'button-secondary-small-label',
          } }
          onClick={ () => handleActionButton({ status: application.status, actionType: 'negative' }) }
        >
          {[ 'applied', 'invited' ].includes(application.status) && 'Reject'}
          {[ 'screening', 'training', 'offered' ].includes(application.status) && 'Cancel'}
          {[ 'hired' ].includes(application.status) && 'Terminate'}
        </Button>
        )}
        <div />

        <div>
          {/* Button for Secondary Actions */}
          <Button
            className='message-button mr-20'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
            onClick={ handleSendMessage }
            disabled={ isNewChatLoading }
          >
            {isNewChatLoading && <CircularProgress size={ 20 } className='small-message-button-loader' />}
            Message
          </Button>

          {/* Button for Primary Actions */}
          {[ 'applied', 'invited',
            'screening', 'training', 'offered',
            'terminated', 'declined' ].includes(application.status)
        && (
        <Button
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
          onClick={ () => handleActionButton({ status: application.status, actionType: 'primary' }) }
        >
            {[ 'applied', 'invited' ].includes(application.status) && 'Evaluate'}
            {application.status === 'screening' && 'Move to training'}
            {application.status === 'training' && 'Offer job'}
            {application.status === 'offered' && 'Hire'}
            {application.status === 'terminated' && 'Rehire'}
            {application.status === 'declined' && 'Invite'}
        </Button>
        )}
        </div>
      </div>
    </>
  )
}

JobApplicationButtons.defaultProps = {
  userDetails: {
    fullName: '',
    profileImage: '',
    title: '',
    summary: '',
    rating: 0,
  },
}

JobApplicationButtons.propTypes = {
  application: PropTypes.shape({
    applicationId: PropTypes.number.isRequired,
    jobId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    agentUserId: PropTypes.number,
  }).isRequired,
  userDetails: PropTypes.shape({
    fullName: PropTypes.string,
    profileImage: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    rating: PropTypes.number,
  }),
}

export default JobApplicationButtons
