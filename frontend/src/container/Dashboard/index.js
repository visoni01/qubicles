import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SideBar from '../../components/Dashboard/sideBar'
import Announcement from '../../components/Dashboard/announcement'
import ActivityPosting from '../../components/Dashboard/activityPosting'
import Overview from '../../components/Dashboard/overview'
import ActivityDetail from '../../components/Dashboard/activityDetail'
import profileLogo1 from '../../assets/images/ray.jpg'
import profileLogo2 from '../../assets/images/helen.jpg'
import demoPic from '../../assets/images/demo-pic.jpeg'
import { dashboardDataFetchingStart } from '../../redux-saga/redux/actions'
import DashboardHeader from '../../components/Dashboard/dashboardHeader'

const Dashboard = () => {
  const dispatch = useDispatch()
  // Fetching dashboard data
  useEffect(() => {
    dispatch(dashboardDataFetchingStart())
  }, [ dispatch ])

  return (
    <div className='dashboard-container'>
      <DashboardHeader />
      <div id='dashboard-wrapper' className='dashboard-outer'>
        <SideBar />
        <div className='dashboard-heading'> Welcome to the Floor, Marlon </div>

        <div id='main-dashboard' className='section-wrapper'>
          <div id='basic-layout' className='columns dashboard-columns'>
            <div className='column is-3'>
              <div className='feed-channels'>
                <div className='custom-header'>
                  Your Community rep
                </div>
                <div className='menu-items'>
                  <div className='mb-4 font-size-custom'> 285 People like your company </div>
                  <div className='font-size-custom'> 111k People are following your company </div>
                </div>
              </div>

              {/* Announcement  */}
              <Announcement />

              {/* Posting  */}

              <ActivityPosting
                title='Job posting'
                data={ [
                  { heading: 'Customer Specialist', subHeading: '16 applications receive' },
                  { heading: 'Call center supervisors', subHeading: '71 applications receive' },
                ] }
              />

              <ActivityPosting
                title='Active users'
                data={ [
                  { heading: 'Marlon Mars', subHeading: 'Offline' },
                  { heading: 'Shivam Moneyheis', subHeading: 'Offline' },
                ] }
              />

            </div>
            <div className='column is-5'>
              <div className='compose-card is-flex is-start is-vcenter'>
                <figure className='avatar image is-hidden-mobile'>
                  <img
                    className='img-circle'
                    src={ profileLogo2 }
                    alt='profile-logo-2'
                  />
                </figure>
                <div className='status-wrapper'>
                  <textarea
                    className='textarea is-grow'
                    rows='5'
                    placeholder='Write something ...'
                  />
                </div>
                <div className='icon-button'>
                  <i data-feather='upload-cloud' />
                </div>
              </div>
              <div className='post-item animated preFadeInLeft fadeInLeft'>
                <div className='is-flex is-start is-vcenter padding-10'>
                  <img
                    className='feed-avatar'
                    src={ profileLogo1 }
                    alt='feed-avatar'
                  />
                  <div className='item-title full-width'>
                    <span> Posted by </span>
                    <span>Ray O&apos;Driscol</span>
                    <span className='feed-time-small float-right'>45 minutes ago</span>
                    <br />
                  </div>
                </div>
                <div className='is-flex is-start is-vcenter'>
                  <p>
                    <span
                      className='post-title'
                    >
                      <span>
                        How team building boosts productivity
                      </span>
                    </span>
                    <br />
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem
                    Ipsum is simply
                    dummy text Lorem Ipsum ...
                  </p>
                </div>
                <div className='is-flex is-start is-vcenter'>
                  <div className='feed-image-container'>
                    <div className='soft-overlay' />
                    <img src={ demoPic } alt='demo-pic' />
                  </div>
                </div>
              </div>
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
      </div>
    </div>
  )
}

export default Dashboard
