/* eslint-disable complexity */
import React from 'react'
import {
  Grid, Tabs, Tab,
} from '@material-ui/core'
import { useLocation, Link } from 'react-router-dom'
import JobsList from './Jobs/JobsList'
import JobsPage from './Jobs/JobsPage'
import TalentFilter from './Talent/TalentFilter'
import TalentPage from './Talent/TalentPage'
import TopTalent from './Talent/TopTalent'
import navBar from '../../../hoc/navbar'
import TrainingFilter from './Training/TrainingFilter'
import TrainingWrap from './Training/TrainingWrap'
import './styles.scss'
import ROUTE_PATHS from '../../../routes/routesPath'

const People = () => {
  const location = useLocation()
  const currentPath = location.pathname

  const jobsRoute = ROUTE_PATHS.PEOPLE_JOBS_TAB
  const talentRoute = ROUTE_PATHS.PEOPLE_TALENT_TAB
  const trainingRoute = ROUTE_PATHS.PEOPLE_TRAINING_TAB

  const temp = [
    jobsRoute, talentRoute, trainingRoute,
  ]

  const spacingMid = currentPath === trainingRoute ? 9 : 6
  const spacingTab = currentPath === trainingRoute ? 8 : 12

  return (
    <div>
      <Grid container spacing={ 3 }>
        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 3 }>
          <div>
            { currentPath === jobsRoute && (
            <JobsList />
            )}
            { currentPath === talentRoute && <TalentFilter />}
            { currentPath === trainingRoute && <TrainingFilter />}
          </div>
        </Grid>
        <Grid
          item
          xl={ spacingMid }
          lg={ spacingMid }
          md={ spacingMid }
          sm={ spacingMid }
          className='custom-active-tabs'
        >
          <Grid item xl={ spacingTab } lg={ spacingTab } md={ spacingTab } sm={ spacingTab }>
            <Tabs
              value={ temp.indexOf(currentPath) }
            >
              <Link to={ jobsRoute } className={ currentPath === jobsRoute ? 'active-tab' : 'inactive-tab' }>
                <Tab
                  label='Jobs'
                />
              </Link>
              <Link to={ talentRoute } className={ currentPath === talentRoute ? 'active-tab' : 'inactive-tab' }>
                <Tab
                  label='Talent'
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
              { currentPath === jobsRoute && (
              <JobsPage />
              )}
              { currentPath === talentRoute && <TalentPage />}
              { currentPath === trainingRoute && <TrainingWrap />}
            </div>
          </Grid>
        </Grid>

        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
          {currentPath !== 2 && (
            <TopTalent heading='Top Talent' />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default navBar(People)
