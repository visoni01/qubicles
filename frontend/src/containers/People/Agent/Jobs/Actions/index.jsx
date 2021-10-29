import React, { useEffect } from 'react'
import '../styles.scss'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { jobApplicationRequestStart } from '../../../../../redux-saga/redux/actions'
import ActionsSkeleton from '../../../../../components/People/Agent/Jobs/Actions/Skeletons/actionsSkeleton'
import ActionsBox from './actionsBox'
import { REQUEST_TYPES } from '../../../../../utils/constants'

const AgentJobActions = ({
  jobId, clientId,
}) => {
  const { userDetails } = useSelector((state) => state.login)
  const { application, isLoading } = useSelector((state) => state.jobApplication)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(jobApplicationRequestStart({
      applicationData: {
        jobId,
        clientId,
        agentUserId: Number(userDetails.user_id),
        testApplicationExist: true,
      },
      requestType: REQUEST_TYPES.FETCH,
    }))
  }, [ dispatch, clientId, jobId, userDetails.user_id ])

  if (isLoading) {
    return (
      <ActionsSkeleton />
    )
  }

  return (
    <ActionsBox
      application={ application }
      jobId={ jobId }
      clientId={ clientId }
      agentUserId={ userDetails.user_id }
    />
  )
}
AgentJobActions.propTypes = {
  jobId: PropTypes.number.isRequired,
  clientId: PropTypes.number.isRequired,

}
export default AgentJobActions
