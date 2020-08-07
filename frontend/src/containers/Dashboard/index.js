import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faThumbsUp, faCamera } from '@fortawesome/free-solid-svg-icons'
import Announcement from '../../components/Dashboard/announcement'
import CommunityRep from '../../components/Dashboard/communityRep'
import JobPosting from '../../components/Dashboard/jobPosting'
import ActiveUser from '../../components/Dashboard/activeUser'
import Overview from '../../components/Dashboard/overview'
import Post from '../../components/Dashboard/post'
import ActivityDetail from '../../components/Dashboard/activityDetail'
import profileLogo1 from '../../assets/images/ray.jpg'
import profileLogo2 from '../../assets/images/helen.jpg'
import demoPic from '../../assets/images/demo-pic.jpeg'
import { dashboardDataFetchingStart } from '../../redux-saga/redux/actions'
import './style.scss'
import withNavBar from '../../hoc/navbar'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { userDetails } = useSelector((state) => state.login)

  // Fetching dashboard data
  useEffect(() => {
    dispatch(dashboardDataFetchingStart())
  }, [ dispatch ])

  return (
    <>
      <div className='dashboard-heading'>
        { `Welcome to the Floor, ${ userDetails && userDetails.full_name } `}
      </div>
      <div id='main-dashboard' className='section-wrapper'>
        <div id='basic-layout' className='columns dashboard-columns'>
          <div className='column is-3'>
            {/* Community Reputation  */}
            <CommunityRep />

            {/* Announcement  */}
            <Announcement />

            {/* Posting  */}
            <JobPosting />

            {/* Active Users  */}
            <ActiveUser />

          </div>
          <div className='column is-5'>
            <Post />
          </div>
          <div className='column is-4'>
            {/* Today's activity */ }
            <ActivityDetail
              title={ 'Today\'s activity' }
              data={ [
                { color: '#ffffff', number: '3,283', label: 'Calls' },
                { color: '#92c47d', number: '3,283', label: 'Sales' },
                { color: '#fed965', number: '3,283', label: 'Live' },
                { color: '#cccccc', number: '3,283', label: 'Logged In' },
                { color: '#6ea8dc', number: '3,283', label: 'Working' },
                { color: '#419e16', number: '3,283', label: 'On a call' },
              ] }
            />

            {/* Overview  */}

            <Overview
              title='Customer service overview'
              data={ [
                { number: '0.20', heading: 'Average speed of answer' },
                { number: '2.45', heading: 'Marlon Mars' },
              ] }
            />

            <Overview
              title='Staff productivity highlights'
              data={ [
                { number: '76', heading: 'Calls per agent' },
                { number: '2:45', heading: 'Average talk time' },
              ] }
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default withNavBar(Dashboard)
