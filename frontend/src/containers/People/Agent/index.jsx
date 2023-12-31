/* eslint-disable complexity */
import React from 'react'
import { Grid, Tabs, Tab } from '@material-ui/core'
import { useLocation, Link } from 'react-router-dom'
import ROUTE_PATHS from '../../../routes/routesPath'
import TrainingFilter from '../ContactCenter/Training/trainingFilter'
import TrainingWrap from '../ContactCenter/Training/trainingWrap'
import AgentJobsFilter from './Jobs/agentJobsFilter'
import AgentJobsPage from '../../../components/People/Agent/Jobs/agentJobsPage'
import ApplicationsPage from './Applications/applicationsPage'
import ApplicationFilter from './Applications/applicationFilter'
import TopCompanies from './Common/topCompanies'

const AgentContactCenter = () => {
  const location = useLocation()
  const currentPath = location.pathname

  const jobsRoute = ROUTE_PATHS.PEOPLE_JOBS_TAB
  const applicationRoute = ROUTE_PATHS.PEOPLE_APPLICATIONS_TAB
  const trainingRoute = ROUTE_PATHS.PEOPLE_TRAINING_TAB

  const temp = [
    jobsRoute, applicationRoute, trainingRoute,
  ]

  const spacingMid = currentPath === trainingRoute ? 9 : 6
  const spacingTab = currentPath === trainingRoute ? 8 : 12

  return (
    <div>
      <Grid container spacing={ 3 }>
        <Grid item xl={ 3 } lg={ 3 } md={ 4 } sm={ 12 } xs={ 12 }>
          <div>
            { currentPath === jobsRoute && <AgentJobsFilter />}
            { currentPath === applicationRoute && <ApplicationFilter />}
            { currentPath === trainingRoute && <TrainingFilter />}
          </div>
        </Grid>
        <Grid item xl={ spacingMid } lg={ spacingMid } md={ 8 } sm={ 12 } xs={ 12 } className='custom-active-tabs'>
          <Grid item xl={ spacingTab } lg={ spacingTab } md={ 12 } sm={ 12 } xs={ 12 }>
            <Tabs value={ temp.indexOf(currentPath) }>
              <Tab
                component={ Link }
                label='Jobs'
                to={ jobsRoute }
                className={ currentPath === jobsRoute ? 'active-tab' : 'inactive-tab' }
              />
              <Tab
                component={ Link }
                label='Applications'
                to={ applicationRoute }
                className={ currentPath === applicationRoute ? 'active-tab' : 'inactive-tab' }
              />
              <Tab
                component={ Link }
                label='Training'
                to={ trainingRoute }
                className={ currentPath === trainingRoute ? 'active-tab' : 'inactive-tab' }
              />
            </Tabs>
          </Grid>
          <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 }>
            <div>
              { currentPath === jobsRoute && <AgentJobsPage />}
              { currentPath === applicationRoute && <ApplicationsPage />}
              { currentPath === trainingRoute && <TrainingWrap />}
            </div>
          </Grid>
        </Grid>

        <Grid item xl={ 3 } lg={ 3 } md={ 4 } sm={ 12 } xs={ 12 }>
          {currentPath !== trainingRoute && (
            <TopCompanies heading='Top Companies' />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default AgentContactCenter
