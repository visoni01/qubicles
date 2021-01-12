/* eslint-disable complexity */
import React from 'react'
import {
  Grid, Tabs, Tab,
} from '@material-ui/core'
import { useLocation, Link } from 'react-router-dom'
import ROUTE_PATHS from '../../../routes/routesPath'
import TrainingFilter from '../ContactCenter/Training/TrainingFilter'
import TrainingWrap from '../ContactCenter/Training/TrainingWrap'
import AgentJobsFilter from './Jobs/AgentJobsFilter'
import AgentJobsPage from './Jobs/AgentJobsPage'
import ApplicationsPage from './Applications/ApplicationsPage'
import ApplicationFilter from './Applications/ApplicationFilter'
import TopComapnies from './Common/TopComapnies'

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
            { currentPath === jobsRoute && (<AgentJobsFilter />)}
            { currentPath === applicationRoute && <ApplicationFilter />}
            { currentPath === trainingRoute && <TrainingFilter />}
          </div>
        </Grid>
        <Grid
          item
          xl={ spacingMid }
          lg={ spacingMid }
          md={ 8 }
          sm={ 12 }
          xs={ 12 }
          className='custom-active-tabs'
        >
          <Grid item xl={ spacingTab } lg={ spacingTab } md={ 12 } sm={ 12 } xs={ 12 }>
            <Tabs
              value={ temp.indexOf(currentPath) }
            >
              <Link to={ jobsRoute } className={ currentPath === jobsRoute ? 'active-tab' : 'inactive-tab' }>
                <Tab
                  label='Jobs'
                />
              </Link>
              <Link to={ applicationRoute } className={ currentPath === applicationRoute ? 'active-tab' : 'inactive-tab' }>
                <Tab
                  label='Applications'
                />
              </Link>
              <Link to={ trainingRoute } className={ currentPath === trainingRoute ? 'active-tab' : 'inactive-tab' }>
                <Tab
                  label='Training'
                />
              </Link>
            </Tabs>
          </Grid>
          <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 }>
            <div>
              { currentPath === jobsRoute && (<AgentJobsPage />)}
              { currentPath === applicationRoute && <ApplicationsPage />}
              { currentPath === trainingRoute && <TrainingWrap />}
            </div>
          </Grid>
        </Grid>

        <Grid item xl={ 3 } lg={ 3 } md={ 4 } sm={ 12 } xs={ 12 }>
          {currentPath !== trainingRoute && (
            <TopComapnies heading='Top Companies' />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default AgentContactCenter
