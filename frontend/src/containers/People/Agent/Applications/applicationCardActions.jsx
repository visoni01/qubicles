/* eslint-disable complexity */
import React, { useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { agentJobApplicationsRequestStart } from '../../../../redux-saga/redux/actions'
import ROUTE_PATHS from '../../../../routes/routesPath'

const ApplicationCardActions = ({
  application, applicationCategoryId,
}) => {
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
      requestType: 'UPDATE',
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
        history.push(ROUTE_PATHS.VIEW_COURSE)
      }
      if ([ 'offered' ].includes(status)) {
        handleUpdateStatus('screening')
      }
    }
  }, [ handleUpdateStatus, history ])
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
          >
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
  applicationCategoryId: PropTypes.number.isRequired,
}

export default ApplicationCardActions
