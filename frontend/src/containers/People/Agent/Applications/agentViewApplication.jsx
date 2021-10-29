import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { jobDetailsFetchStart } from '../../../../redux-saga/redux/actions'
import CompanyStats from '../Jobs/companyStats'
import JobPost from '../../ContactCenter/Jobs/jobPost'
import IntroductionSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/Jobs/contactCenterSkeleton'
import ActionsBox from '../Jobs/Actions/actionsBox'
import CoverLetter from '../../../../components/People/ContactCenter/Talent/Application/coverLetter'

const AgentViewApplication = ({ application, applicationSuccess }) => {
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
              companyRating={ jobDetails.companyDetails.rating }
              location={ `${ jobDetails.companyDetails.city }, ${ jobDetails.companyDetails.state }` }
              title={ jobDetails.companyDetails.title }
              summary={ jobDetails.companyDetails.summary }
              registrationDate={ jobDetails.companyDetails.registration_date }
              hires={ jobDetails.companyDetails.hires }
              jobsPosted={ jobDetails.companyDetails.jobsPosted }
            />
          ) : (<IntroductionSkeleton />
          )}
      </Grid>
      <Grid container item xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 } spacing={ 3 } direction='column'>
        <Grid item>
          <CoverLetter application={ application } />
        </Grid>
        <Grid item>
          <JobPost
            key={ application.jobId }
            jobId={ application.jobId }
            jobDetails={ jobDetails }
            isLoading={ isLoading }
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

AgentViewApplication.defaultProps = {
  applicationSuccess: false,
}

AgentViewApplication.propTypes = {
  applicationSuccess: PropTypes.bool,
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
}

export default AgentViewApplication
