import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { jobApplicationRequestStart, startLoader, stopLoader } from '../../../redux-saga/redux/actions'
import ClientViewApplication from '../ContactCenter/Talent/Application'
import AgentViewApplication from '../Agent/Applications/agentViewApplication'

const JobApplicationPage = () => {
  let { applicationId } = useParams()
  applicationId = parseInt(applicationId, 10)
  const dispatch = useDispatch()
  const {
    application, isLoading, success, error, requestType,
  } = useSelector((state) => state.jobApplication)
  const { userDetails } = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(jobApplicationRequestStart({
      applicationData: {
        applicationId,
      },
      requestType: 'FETCH',
    }))
  }, [ dispatch, applicationId ])

  if (isLoading) {
    dispatch(startLoader())
  } else {
    dispatch(stopLoader())
  }

  if (error) {
    return (
      <div className='is-fullwidth'>
        <h1 className='h1 text-center'> 404 Error</h1>
        <h1 className='h1 text-center'> Application not found </h1>
      </div>
    )
  }

  if (!isLoading || requestType === 'UPDATE') {
    if (userDetails.user_code === 'employer') {
      return (
        <ClientViewApplication
          applicationLoading={ isLoading }
          applicationSuccess={ success }
          application={ application }
        />
      )
    }

    return (
      <AgentViewApplication
        applicationSuccess={ success }
        application={ application }
      />
    )
  }
  return (<> </>)
}

export default JobApplicationPage