import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { fetchAgentResumeStart } from '../../../../../redux-saga/redux/actions'
import ResumeIntro from './ResumeIntro'
import CoverLetter from './CoverLetter'
import SkillsPage from './SkillsPage'
import WorkHistory from './WorkHistory'
import Courses from './Courses'
import AgentReviews from '../../../../Profile/Agent/Resume/agentReviews'
import ClientJobApplicationActions from '../../Jobs/Actions'

const ClientViewApplication = ({
  applicationLoading, application, applicationSuccess,
}) => {
  const dispatch = useDispatch()
  const { agentResume } = useSelector((state) => state.agentResume)
  useEffect(() => {
    if (!applicationLoading && applicationSuccess && application.agentUserId !== agentResume.candidateId) {
      dispatch(fetchAgentResumeStart({ candidateId: application.agentUserId }))
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
          <WorkHistory />
        </Grid>
        <Grid item>
          <Courses />
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
        />
      </Grid>
    </Grid>
  )
}

ClientViewApplication.propTypes = {
  applicationLoading: PropTypes.bool.isRequired,
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
export default ClientViewApplication
