import React, { useEffect } from 'react'
import './style.scss'
import {
  Box, Grid,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons'
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
        <Box className='box'>
          <div className='activity-section'>
            <h3 className='mb-3 heading'>
              Today's Activity
              <FontAwesomeIcon icon={ faEllipsisV } className='pull-right' />
            </h3>
            <div>
              <ul>
                <li>
                  <p className='green'>
                    3.282
                  </p>
                  <p>
                    Calls
                  </p>
                </li>
                <li>
                  <p className='green'>
                    680
                  </p>
                  <p>
                    Sales
                  </p>
                </li>
                <li>
                  <p className='yellow'>
                    558
                  </p>
                  <p>
                    Working
                  </p>
                </li>
              </ul>

              <ul>
                <li className=''>
                  <p className='green'>
                    754
                  </p>
                  <p>
                    Live
                  </p>
                </li>
                <li>
                  <p className='red'>
                    599
                  </p>
                  <p>
                    Online
                  </p>
                </li>
                <li>
                  <p className='yellow'>
                    260
                  </p>
                  <p>
                    On a Call
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Box>

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
                Average speed of answer
              </p>

              <p>
                <span className='dark-color'>
                  <b className='number'>2.45</b>
                  {' '}
                </span>
                Marlon mars
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
                  <b className='number'>0.20</b>
                </span>
                Calls per agent
              </p>
              <p>
                <span className='dark-color'>
                  <b className='number'>2.45</b>
                </span>
                Average talk time
              </p>
            </div>
          </div>
        </Box>
      </Grid>
    </Grid>
  )
}

export default newNavBar(Dashboard)
