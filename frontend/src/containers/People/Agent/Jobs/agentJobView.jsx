import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './styles.scss'
import { jobDetailsFetchStart } from '../../../../redux-saga/redux/actions'
import { jobPostCard } from '../../ContactCenter/testData'
import JobPost from '../../ContactCenter/Jobs/JobPost'
import AgentJobActions from './Actions'
import CompanyStats from './companyStats'
import ContactCenterSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/ContactCenterSkeleton'

const AgentJobView = () => {
  const { jobId } = useParams()
  const { jobDetails, isLoading, success } = useSelector((state) => state.jobDetails)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(jobDetailsFetchStart({ jobId }))
  }, [ dispatch, jobId ])

  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        {!isLoading && success
          ? (
            <CompanyStats
              key={ jobDetails.clientId }
              clientId={ jobDetails.clientId }
              companyDetails={ jobDetails && jobDetails.companyDetails }
              companyName={ jobDetails.companyDetails.client_name }
              companyImageSrc={ jobDetails.companyDetails.profile_image }
              location={ `${ jobDetails.companyDetails.city }, ${ jobDetails.companyDetails.state }` }
              title={ jobDetails.companyDetails.title }
              summary={ jobDetails.companyDetails.summary }
              registrationDate={ jobDetails.companyDetails.registration_date }
            />
          ) : (<ContactCenterSkeleton />
          )}
      </Grid>
      <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 }>
        <JobPost
          key={ jobId }
          jobId={ jobId }
          jobDetails={ jobDetails }
          isLoading={ isLoading }
          courses={ jobPostCard.courses }
        />
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <AgentJobActions />
      </Grid>
    </Grid>
  )
}

export default AgentJobView
