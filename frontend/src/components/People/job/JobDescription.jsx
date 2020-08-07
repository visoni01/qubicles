import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { jobSubDetailsValidator } from '../peopleValidator'
import JobsActions from './jobsActions'

const JobDescription = ({
  categoryId, notifications, title, description, noOfApplications, jobId, ownerId,
}) => (
  <div className='forum-channel'>
    <div className='channel-icon'>
      <FontAwesomeIcon icon={ faSuitcase } />
      {/* New Topics */}
      <div className='new-indicator'>
        <span>{notifications}</span>
      </div>
    </div>
    <div className='channel-meta'>
      <span>{title}</span>
      <span>{description}</span>
    </div>
    <div className='channel-topics'>
      <span>Applications</span>
      <span>{noOfApplications }</span>
    </div>

    <JobsActions categoryId={ categoryId } title={ title } jobId={ jobId } ownerId={ ownerId } key={ jobId } />
  </div>
)

JobDescription.defaultProps = {
  notifications: 3,
  noOfApplications: 0,
}

JobDescription.propTypes = jobSubDetailsValidator

export default JobDescription
