import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { fetchAgentResumeStart } from '../../../../../redux-saga/redux/actions'
import ResumeIntro from './resumeIntro'
import CoverLetter from '../../../../../components/People/ContactCenter/Talent/Application/coverLetter'
import SkillsPage from './skillsPage'
import ResumeWorkHistory from './resumeWorkHistory'
import AgentReviews from '../../../../Profile/Agent/Resume/agentReviews'
import ClientJobApplicationActions from '../../Jobs/Actions'
import Courses from '../../../../Profile/Agent/Resume/courses'

const ClientViewApplication = ({
  applicationLoading, application, applicationSuccess,
}) => {
  const dispatch = useDispatch()
  const { agentResume } = useSelector((state) => state.agentResume)
  useEffect(() => {
    if (!applicationLoading && applicationSuccess && application.agentUserId !== agentResume.candidateId) {
      dispatch(fetchAgentResumeStart({
        requestType: 'FETCH',
        candidateId: application.agentUserId,
      }))
    }
  }, [ dispatch, application.agentUserId, agentResume.candidateId, applicationLoading, applicationSuccess ])

  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <ResumeIntro
          candidateId={ agentResume.candidateId }
          candidateName={ agentResume.candidateName }
          candidateRating={ agentResume.candidateRating }
          location={ agentResume.location }
          profileName={ agentResume.profileName }
          profileImage={ agentResume.profileImage }
          profileDescription={ agentResume.profileDescription }
          ratePerHourDollar={ agentResume.ratePerHourDollar }
          highestEducation={ agentResume.highestEducation }
          yearsOfExpirience={ agentResume.yearsOfExpirience }
        />
      </Grid>
      <Grid container spacing={ 3 } direction='column' item xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 }>
        <Grid item>
          <CoverLetter
            key={ application.applicationId }
            application={ application }
          />
        </Grid>
        <Grid item>
          <SkillsPage
            candidateId={ agentResume.candidateId }
            languages={ agentResume.languages }
          />
        </Grid>
        <Grid item>
          <ResumeWorkHistory />
        </Grid>
        <Grid item>
          <Courses candidateId={ agentResume.candidateId } />
        </Grid>
        {agentResume && agentResume.candidateId && (
        <Grid item>
          <AgentReviews
            agentUserId={ agentResume.candidateId }
          />
        </Grid>
        )}
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <ClientJobApplicationActions
          key={ application.applicationId }
          application={ application }
          candidateId={ agentResume.candidateId }
          candidateName={ agentResume.candidateName }
          location={ agentResume.location }
          profileName={ agentResume.profileName }
          profileImage={ agentResume.profileImage }
        />
      </Grid>
    </Grid>
  )
}

ClientViewApplication.defaultProps = {
  applicationSuccess: false,
  applicationLoading: false,
}

ClientViewApplication.propTypes = {
  applicationLoading: PropTypes.bool,
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
export default ClientViewApplication
