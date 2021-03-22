import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { jobDetailsFetchStart } from '../../../../redux-saga/redux/actions'
import CompanyStats from '../Jobs/companyStats'
import JobPost from '../../ContactCenter/Jobs/JobPost'
import { jobPostCard } from '../../ContactCenter/testData'
import IntroductionSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/contactCenterSkeleton'
import ActionsBox from '../Jobs/Actions/ActionsBox'
import CoverLetter from '../../ContactCenter/Talent/Application/CoverLetter'

const AgentViewApplication = ({
  application, applicationSuccess,
}) => {
  const { jobDetails, isLoading, success } = useSelector((state) => state.jobDetails)
  const dispatch = useDispatch()
  useEffect(() => {
    if (applicationSuccess) {
      dispatch(jobDetailsFetchStart({ jobId: application.jobId }))
    }
    // eslint-disable-next-line
  }, [ dispatch, application ])

  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        {!isLoading && success && jobDetails
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
          ) : (<IntroductionSkeleton />
          )}
      </Grid>
      <Grid container item xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 } spacing={ 3 } direction='column'>
        <Grid item>
          <CoverLetter
            application={ application }
          />
        </Grid>
        <Grid item>
          <JobPost
            key={ application.jobId }
            jobId={ application.jobId }
            jobDetails={ jobDetails }
            isLoading={ isLoading }
            courses={ jobPostCard.courses }
          />
        </Grid>
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <ActionsBox
          jobId={ application.jobId }
          clientId={ application.clientId }
          application={ application }
          agentUserId={ application.agentUserId }
        />
      </Grid>
    </Grid>
  )
}

AgentViewApplication.propTypes = {
  applicationSuccess: PropTypes.bool.isRequired,
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
}

export default AgentViewApplication
