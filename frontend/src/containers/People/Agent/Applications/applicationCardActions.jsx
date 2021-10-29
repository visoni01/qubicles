/* eslint-disable complexity */
import React, { useCallback, useEffect, useState } from 'react'
import { Grid, Button, CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { agentJobApplicationsRequestStart, allChatsRequestStart } from '../../../../redux-saga/redux/actions'
import { VIEW_COURSE_ROUTE } from '../../../../routes/routesPath'
import { applicationPropTypes, clientDetailsPropTypes, jobDetailsPropTypes } from './propTypes'
import { REQUEST_TYPES } from '../../../../utils/constants'
import { NEW_CHAT } from '../../../../redux-saga/redux/constants'

const ApplicationCardActions = ({
  application, applicationCategoryId, jobDetails, clientDetails,
}) => {
  const [ isNewChatLoading, setIsNewChatLoading ] = useState(false)
  const { isLoading, dataType } = useSelector((state) => state.allChats)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleUpdateStatus = useCallback((status) => {
    dispatch(agentJobApplicationsRequestStart({
      applicationListData: {
        applicationId: application.applicationId,
        jobId: application.jobId,
        status,
        applicationCategoryId,
      },
      requestType: REQUEST_TYPES.UPDATE,
    }))
  }, [ dispatch, application, applicationCategoryId ])

  const handleActionButton = useCallback(({ status, actionType }) => {
    if (actionType === 'negative') {
      if ([ 'applied', 'screening', 'training', 'offered' ].includes(status)) {
        handleUpdateStatus('declined')
      }
      if ([ 'invited' ].includes(status)) {
        handleUpdateStatus('rejected')
      }
      if ([ 'hired' ].includes(status)) {
        handleUpdateStatus('resigned')
      }
    }

    if (actionType === 'primary') {
      if ([ 'invited' ].includes(status)) {
        handleUpdateStatus('screening')
      }
      if ([ 'screening' ].includes(status)) {
        handleUpdateStatus('training')
      }
      if ([ 'training' ].includes(status)) {
        history.push(`${ VIEW_COURSE_ROUTE }/1`)
      }
      if ([ 'offered' ].includes(status)) {
        handleUpdateStatus('screening')
      }
    }
  }, [ handleUpdateStatus, history ])

  const handleSendMessage = useCallback(() => {
    setIsNewChatLoading(true)
    dispatch(allChatsRequestStart({
      requestType: REQUEST_TYPES.CREATE,
      dataType: NEW_CHAT,
      candidate: {
        id: clientDetails?.userId,
        clientId: clientDetails?.clientId,
        name: clientDetails?.clientName,
        profilePic: clientDetails?.profileImage,
        location: jobDetails?.location,
        title: clientDetails?.title,
        userCode: 'employer',
      },
      onlyPopup: true,
    }))
  }, [ dispatch, jobDetails, clientDetails ])

  useEffect(() => {
    if (!isLoading && dataType === NEW_CHAT) {
      setIsNewChatLoading(false)
    }
  }, [ isLoading, dataType ])

  return (
    <Grid container spacing={ 3 } justify='space-between'>
      <Grid item xs={ 6 }>
        {/* Negative Action */}
        {[ 'applied', 'screening', 'training', 'offered', 'invited', 'hired' ].includes(application.status)
        && (
        <Button
          classes={ {
            root: 'button-secondary-small-red',
            label: 'button-secondary-small-label',
          } }
          onClick={ () => handleActionButton({ status: application.status, actionType: 'negative' }) }
        >
          {[ 'applied', 'screening', 'training', 'offered' ].includes(application.status) && 'Withdraw'}
          {application.status === 'invited' && 'Reject'}
          {application.status === 'hired' && 'Resign'}
        </Button>
        )}
      </Grid>
      <Grid item xs={ 6 } container spacing={ 3 } justify='flex-end'>
        <Grid item>
          {/* Secondary Action */}
          <Button
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
        </Grid>
        <Grid item>
          {/* Primary Action */}
          {[ 'invited', 'screening', 'training', 'offered' ].includes(application.status)
          && (
          <Button
            classes={ {
              root: 'button-primary-small',
              label: 'button-primary-small-label',
            } }
            onClick={ () => handleActionButton({ status: application.status, actionType: 'primary' }) }
          >
            {[ 'invited', 'offered' ].includes(application.status) && 'Accept'}
            {application.status === 'screening' && 'Training'}
            {application.status === 'training' && 'Go to Training'}
          </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

ApplicationCardActions.propTypes = {
  application: applicationPropTypes.isRequired,
  jobDetails: jobDetailsPropTypes.isRequired,
  clientDetails: clientDetailsPropTypes.isRequired,
  applicationCategoryId: PropTypes.number.isRequired,
}

export default ApplicationCardActions
