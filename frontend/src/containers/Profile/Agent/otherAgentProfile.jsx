/* eslint-disable complexity */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useParams, useLocation, useHistory,
} from 'react-router-dom'
import { Grid, Tabs, Tab } from '@material-ui/core'
import Feed from './Feed'
import './styles.scss'
import { PROFILE_ROUTE } from '../../../routes/routesPath'
import SkillsPage from '../../People/ContactCenter/Talent/Application/skillsPage'
import WorkHistory from './Resume/workHistory'
import Courses from './Resume/courses'
import AgentReviews from './Resume/agentReviews'
import { fetchAgentResumeStart } from '../../../redux-saga/redux/people'
import LeftSection from './LeftRightSection'
import IntroductionSkeleton from '../../../components/People/ContactCenter/SkeletonLoader/Jobs/contactCenterSkeleton'
import PeopleYouMayKnow from './peopleYouMayKnowCard'

const OtherAgentProfile = () => {
  const { agentResume, isLoading } = useSelector((state) => state.agentResume)
  const { settings } = useSelector((state) => state.agentDetails)
  const { userDetails } = useSelector((state) => state.login)
  const location = useLocation()
  const currentPath = location.pathname
  const dispatch = useDispatch()
  const history = useHistory()

  let { userId } = useParams()
  userId = parseInt(userId, 10)
  const feedRoute = `${ PROFILE_ROUTE }/${ userId }/feed`
  const resumeRoute = `${ PROFILE_ROUTE }/${ userId }/resume`
  const temp = [ feedRoute, resumeRoute ]

  useEffect(() => {
    if (userId !== agentResume.candidateId) {
      dispatch(fetchAgentResumeStart({ candidateId: userId }))
    }
  }, [ dispatch, userId, agentResume.candidateId ])

  return (
    <div>
      <Grid container spacing={ 3 } justify='center'>
        <Grid item xl={ 3 } lg={ 3 } md={ 9 } sm={ 12 } xs={ 12 }>
          <div className='left-section'>
            {!isLoading && isLoading !== null ? (
              <LeftSection
                candidateId={ agentResume.candidateId }
                name={ agentResume.candidateName }
                rating={ agentResume.candidateRating }
                location={ agentResume.location }
                registrationDate={ agentResume.registrationDate }
                title={ agentResume.profileName }
                profilePic={ agentResume.profileImage }
                summary={ agentResume.profileDescription }
                hourlyRate={ agentResume.ratePerHourDollar }
                highestEducation={ agentResume.highestEducation }
                yearsOfExperience={ agentResume.yearsOfExperience }
              />
            ) : (
              <IntroductionSkeleton />
            )}
          </div>
        </Grid>
        <Grid
          item
          xl={ 6 }
          lg={ 6 }
          md={ 9 }
          sm={ 12 }
          xs={ 12 }
          className='custom-active-tabs'
        >
          <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
            <Tabs
              value={ temp.indexOf(currentPath) }
            >
              <Tab
                onClick={ () => history.push(feedRoute) }
                className={ currentPath === feedRoute ? 'active-tab' : 'inactive-tab' }
                label='Feed'
              />
              <Tab
                onClick={ () => history.push(resumeRoute) }
                className={ currentPath === resumeRoute ? 'active-tab' : 'inactive-tab' }
                label='Resume'
              />
            </Tabs>
          </Grid>
          <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 }>
            <div>
              { currentPath === feedRoute && (<Feed userId={ userId } />)}
              { currentPath === resumeRoute && (
                <>
                  <SkillsPage
                    candidateId={ userId }
                    languages={ userDetails.user_id !== userId ? agentResume.languages : settings.languages }
                    userType='other'
                  />
                  <WorkHistory />
                  <Courses />
                  <AgentReviews agentUserId={ userId } />
                </>
              )}
            </div>
          </Grid>
        </Grid>

        <Grid item xl={ 3 } lg={ 3 } md={ 9 } sm={ 12 } xs={ 12 }>
          <PeopleYouMayKnow heading='People you may know' />
        </Grid>
      </Grid>
    </div>
  )
}

export default OtherAgentProfile
