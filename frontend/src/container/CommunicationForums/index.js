import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ForumWrap from '../../components/CommunicationForums/ForumWrap'
import dummyData from './dummyData'

const Forum = () => (
  <div id='dashboard-wrapper' className='dashboard-outer'>
    <div className='dashboard-inner'>
      {/* Dashboard Wrapper */}
      <div className='dashboard-wrapper'>
        <div id='main-dashboard' className='section-wrapper'>
          {/* Dashboard content */}
          <div id='forum-home' className='dashboard-columns'>
            {/* Page title */}
            <div className='control forum-search'>
              <input type='text' className='input is-rounded' placeholder='Search Forum...' />
              <div className='search-icon'>
                <FontAwesomeIcon icon={ faSearch } />
              </div>
            </div>
            {/* Forum Category */}
            {dummyData.map((group) => <ForumWrap { ...group } key={ `${ group.title }` } />)}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Forum
