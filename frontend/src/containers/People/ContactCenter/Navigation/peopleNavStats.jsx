import React from 'react'
import { Divider } from '@material-ui/core'
import {
  briefcaseSmall, chatSmall, mediaSmall, userSmall,
} from '../../../../assets/images/icons/peopleNavigationIcons'

const PeopleNavStats = () => (
  <div>
    <div className='people-info'>
      <img src={ briefcaseSmall } alt='briefcase' className='icon' />
      <span className='para bold'>5,223</span>
      <span className='para'>Open Jobs</span>
    </div>
    <div className='people-info'>
      <img src={ chatSmall } alt='briefcase' className='icon' />
      <span className='para bold'>839</span>
      <span className='para'>Groups</span>
    </div>
    <div className='people-info'>
      <img src={ mediaSmall } alt='briefcase' className='icon' />
      <span className='para bold'>731</span>
      <span className='para'>Courses</span>
    </div>
    <div className='people-info'>
      <img src={ userSmall } alt='briefcase' className='icon' />
      <span className='para bold'>533</span>
      <span className='para'>Agents</span>
    </div>
    <Divider className='divider' />
  </div>
)

export default PeopleNavStats
