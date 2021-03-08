import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ResumeIntro from './Application/ResumeIntro'
import Courses from './Application/Courses'
import SkillsPage from './Application/SkillsPage'
import WorkHistory from './Application/WorkHistory'
import Actions from '../Jobs/Actions'
import './styles.scss'
import { fetchAgentResumeStart } from '../../../../redux-saga/redux/actions'
import AgentReviews from '../../../Profile/Agent/Resume/agentReviews'

const ViewResume = () => {
  const dispatch = useDispatch()
  let { candidateId } = useParams()
  candidateId = parseInt(candidateId, 10)
  const { agentResume } = useSelector((state) => state.agentResume)
  useEffect(() => {
    dispatch(fetchAgentResumeStart({ candidateId }))
  }, [ dispatch, candidateId ])
  return (
    <Grid container spacing={ 3 } justify='center'>
      <Grid item xl={ 3 } lg={ 3 } md={ 4 } sm={ 12 }>
        <ResumeIntro
          candidateId={ agentResume.candidateId }
          candidateName={ agentResume.candidateName }
          candidateRating={ agentResume.candidateRating }
          location={ agentResume.location }
          profileName={ agentResume.profileName }
          profileDescription={ agentResume.profileDescription }
          ratePerHourDollar={ agentResume.ratePerHourDollar }
          highestEducation={ agentResume.highestEducation }
          yearsOfExpirience={ agentResume.yearsOfExpirience }
        />
      </Grid>
      <Grid item xl={ 6 } lg={ 6 } md={ 5 } sm={ 12 }>
        <SkillsPage
          candidateId={ candidateId }
          languages={ agentResume.languages }
        />
        <WorkHistory />
        <Courses />
        {/* WIP Reviews Section */}
        <AgentReviews agentUserId={ agentResume.candidateId } />
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 12 }>
        <Actions />
      </Grid>
    </Grid>
  )
}

export default ViewResume
