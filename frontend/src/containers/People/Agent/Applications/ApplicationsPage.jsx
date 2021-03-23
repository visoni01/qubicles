import React, { useEffect, useState, useCallback } from 'react'
import { Box, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import ApplicationCard from './ApplicationCard'
import { startLoader, stopLoader } from '../../../../redux-saga/redux/loader'
import { agentJobApplicationsRequestStart } from '../../../../redux-saga/redux/actions'

export default function ApplicationsPage() {
  const {
    applicationsList, applicationFilter,
    selectedApplicationCategory, isLoading,
  } = useSelector((state) => state.agentJobApplications)
  const { userDetails } = useSelector((state) => state.login)

  const [ applications, setApplications ] = useState(applicationsList[ selectedApplicationCategory ])
  const dispatch = useDispatch()
  useEffect(() => {
    setApplications(applicationsList[ selectedApplicationCategory ])
  }, [ applicationsList, selectedApplicationCategory ])

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoader())
    } else {
      dispatch(stopLoader())
    }
  }, [ dispatch, isLoading ])

  const handleViewMoreButtons = useCallback(() => {
    dispatch(agentJobApplicationsRequestStart({
      applicationListData: {
        agentUserId: userDetails.user_id,
        limit: applicationFilter[ selectedApplicationCategory ].limit,
        offset: applicationFilter[ selectedApplicationCategory ].offset,
        statusTypes: applicationFilter[ selectedApplicationCategory ].statusTypes,
        applicationCategoryId: applicationFilter[ selectedApplicationCategory ].id,
      },
      requestType: 'FETCH',
    }))
  }, [ dispatch, userDetails, applicationFilter, selectedApplicationCategory ])

  return (
    <div>
      <Box className='custom-box mb-30'>
        <h3 className='h3 mb-20'>{applicationFilter[ selectedApplicationCategory ].name}</h3>
        {applications.map((applicationDetails) => (
          <ApplicationCard
            key={ applicationDetails.application.applicationId }
            application={ applicationDetails.application }
            jobDetails={ applicationDetails.jobDetails }
            clientDetails={ applicationDetails.clientDetails }
            applicationCategoryId={ applicationFilter[ selectedApplicationCategory ].id }
          />
        ))}
        {applicationFilter[ selectedApplicationCategory ].more && (
        <Button
          className='is-fullwidth'
          classes={ {
            root: 'button-primary-text',
            label: 'button-primary-text-label',
          } }
          onClick={ () => handleViewMoreButtons() }
        >
          Load more applications
        </Button>
        )}
        {applicationFilter[ selectedApplicationCategory ].initialFetch
        && applications.length < 1
        && !applicationFilter[ selectedApplicationCategory ].more && (
          <p className='mt-10 mb-10 is_fullwidth text-center para italic bold light font-size-16x'>
            No Applications in this category...
          </p>
        )}
      </Box>
    </div>
  )
}
