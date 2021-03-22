import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import CommunityRep from '../../../components/Dashboard/LeftSection/communityRep'
import JobPostings from '../../../components/Dashboard/LeftSection/jobPostings'
import { dashboardDataFetchingStart } from '../../../redux-saga/redux/actions'
import CheckrVerification from '../../../components/Dashboard/LeftSection/chekrVerification'
import CreatePost from './Posts/createPost'
import RenderPosts from './Posts/renderPosts'
import TodayActivity from '../../../components/Dashboard/RightSection/todaysActivity'
import CustomerServiceOverview from '../../../components/Dashboard/RightSection/customerServiceOverview'
import SelfProductivity from '../../../components/Dashboard/RightSection/selfProductivity'
import './style.scss'

const Dashboard = () => {
  const dispatch = useDispatch()

  // Fetching dashboard data
  useEffect(() => {
    dispatch(dashboardDataFetchingStart())
  }, [ dispatch ])
  return (
    <Grid container spacing={ 3 }>
      {/*  Left Section */}
      <Grid item xl={ 3 } lg={ 3 } md={ 12 } sm={ 12 } xs={ 12 }>
        <CheckrVerification />
        <CommunityRep />
        {/* WIP: Refactor latest announcement */}
        {/* <LatestAnnouncement /> */}
        <JobPostings />
      </Grid>

      {/* Center Section */}
      <Grid item xl={ 6 } lg={ 6 } md={ 12 } sm={ 12 } xs={ 12 }>
        {/* Create new post */}
        <CreatePost />
        {/* Render Posts */}
        <RenderPosts ownerId={ null } />
      </Grid>

      {/* Right Section */}
      <Grid item xl={ 3 } lg={ 3 } md={ 12 } sm={ 12 } xs={ 12 }>
        <TodayActivity />
        <CustomerServiceOverview />
        <SelfProductivity />
      </Grid>
    </Grid>
  )
}

export default Dashboard
