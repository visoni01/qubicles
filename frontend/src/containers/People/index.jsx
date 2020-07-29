import React, { useState } from 'react'
import {
  Tab, Tabs, Divider, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus, faEllipsisV,
} from '@fortawesome/free-solid-svg-icons'
import JobsPage from './jobsPage'
import TalentWrap from './talentWrap'
import TrainingWrap from './trainingWrap'
import withNavBar from '../../hoc/navbar'
import './style.scss'

const People = () => {
  const [ activeTab, setActivetab ] = useState(0)
  return (
    <>
      <div id='main-dashboard' className='section-wrapper'>
        {/* Dashboard content */}
        <div id='forum-home' className='dashboard-columns'>
          <div className='people-header-paper mb-10 '>
            <div className='MuiAvatar-root avatar MuiAvatar-colorDefault people-header-icon'>P</div>
            <div className='people-header-title'>
              People
            </div>
            <Tabs
              value={ activeTab }
              indicatorColor='primary'
              textColor='primary'
              onChange={ (_, tab) => setActivetab(tab) }
              className='ml-20'
            >
              <Tab label='Jobs' />
              <Tab label='Talent' />
              <Tab label='Training' />
            </Tabs>
            <IconButton>
              <FontAwesomeIcon icon={ faPlus } className='people-header-icons' />
            </IconButton>
            <IconButton className='people-header-action-icon'>
              <FontAwesomeIcon icon={ faEllipsisV } className='people-header-icons' />
            </IconButton>
          </div>
          <Divider />
          {/* Forum Category */}
          <div className='forum-wrap'>
            { activeTab === 0 && <JobsPage />}
            { activeTab === 1 && <TalentWrap />}
            { activeTab === 2 && <TrainingWrap />}
          </div>
        </div>
      </div>
    </>
  )
}

export default withNavBar(People)
