/* eslint-disable complexity */
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  startLoader,
  stopLoader,
  jobApplicationListRequestStart,
} from '../../../../redux-saga/redux/actions'

const JobApplicationButtons = ({ application }) => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.jobApplication)
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

  if (isLoading) {
    dispatch(startLoader())
  } else {
    dispatch(stopLoader())
  }

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
          >
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

JobApplicationButtons.propTypes = {
  application: PropTypes.shape({
    applicationId: PropTypes.number.isRequired,
    jobId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
}

export default JobApplicationButtons
