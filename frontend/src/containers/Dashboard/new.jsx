import React, { useEffect } from 'react'
import './style.scss'
import {
  Box, Grid,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { newNavBar } from '../../hoc/navbar'
import CommunityRep from './CommunityRep'
import LatestAnnouncement from './LatestAnnouncement'
import JobPostings from './JobPostings'
import { dashboardDataFetchingStart } from '../../redux-saga/redux/actions'
import CheckrVerification from './ChekrVerification'
import './newStyles.scss'
import NewCreatePost from '../../components/Dashboard/NewCreatePost'
import RenderPosts from './RenderPosts'
import TodayActivity from './TodaysActivity'

const Dashboard = () => {
  const dispatch = useDispatch()

  // Fetching dashboard data
  useEffect(() => {
    dispatch(dashboardDataFetchingStart())
  }, [ dispatch ])
  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <CheckrVerification />
        <CommunityRep />
        <LatestAnnouncement />
        <JobPostings />
      </Grid>
      <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 }>
        <Box className='box'>
          <NewCreatePost />
        </Box>
        <RenderPosts />
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <TodayActivity />
        <Box className='box'>
          <div className='customer-service'>
            <h3 className='heading'>
              Customer  Service Overview
            </h3>

            <div className='customer-service-content'>
              <p>
                <span className='green-color'>
                  <b className='number green'>0.20</b>
                  {' '}
                </span>
                <span className='text'>Average speed of answer</span>
              </p>

              <p>
                <span className='dark-color'>
                  <b className='number'>2.45</b>
                  {' '}
                </span>
                <span className='text'>Marlon mars</span>
              </p>
            </div>
          </div>
        </Box>

        <Box className='box'>
          <div className='customer-service'>
            <h3 className='heading'>
              Staff Productivity Highlights
            </h3>

            <div className='customer-service-content'>
              <p>
                <span className='dark-color'>
                  <b className='number'>76</b>
                </span>
                <span className='text'>Calls per agent</span>
              </p>
              <p>
                <span className='dark-color'>
                  <b className='number'>2.45</b>
                </span>
                <span className='text'>Average talk time</span>
              </p>
            </div>
          </div>
        </Box>
      </Grid>
    </Grid>
  )
}

export default newNavBar(Dashboard)
