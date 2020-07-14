import React, { useState } from 'react'
import {
  Button, Tab, Tabs, Divider, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch, faPlus, faEllipsisV,
} from '@fortawesome/free-solid-svg-icons'
import JobsWrap from './jobsWrap'
import withNavBar from '../../Hoc/navbar'
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
          {/* Page title */}
          <div className='search-bar-header mt-10'>
            <div className='control forum-search people-search-bar'>
              <input type='text' className='input is-rounded' placeholder='Search Forum...' />
              <div className='search-icon'>
                <FontAwesomeIcon icon={ faSearch } />
              </div>
            </div>
            <Button
              variant='contained'
              className='new-job-button'
              startIcon={ <FontAwesomeIcon icon={ faPlus } className='people-header-icons' /> }
            >
              New Job
            </Button>
          </div>
          {/* Forum Category */}
          <div className='forum-wrap'>
            <JobsWrap />
          </div>
        </div>
      </div>
    </>
  )
}

export default withNavBar(People)
