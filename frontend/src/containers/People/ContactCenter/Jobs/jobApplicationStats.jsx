import React from 'react'
import { Divider } from '@material-ui/core'
import { faUserFriends, faRedo, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { formatCount } from '../../../../utils/common'

const JobApplicationStats = () => {
  const { jobDetails } = useSelector((state) => state.jobDetails)

  return (
    <div>
      <div className='para mt-20'>
        <span className='para bold'>
          {formatCount(jobDetails.jobApplicationStats.totalApplications)}
        </span>
        <p className='mt-10'> Members </p>
      </div>
      <Divider className='divider' />
      <div className='job-post-stats'>
        <div className='data'>
          <FontAwesomeIcon className='custom-fa-icon light' icon={ faUserFriends } />
          <span className='para bold'>
            {`${ jobDetails.fulfilled || 0 }/${ jobDetails.needed || 0 }`}
          </span>
          <span className='para light'> Agents Hired  </span>
        </div>
        <div className='data'>
          <FontAwesomeIcon className='custom-fa-icon light' icon={ faRedo } />
          <span className='para bold'>
            {formatCount(jobDetails.evaluating || 0)}
          </span>
          <span className='para light'> Evaluating  </span>
        </div>
        <div className='data'>
          <FontAwesomeIcon className='custom-fa-icon light' icon={ faEnvelope } />
          <span className='para bold'>
            {formatCount(jobDetails.pending || 0)}
          </span>
          <span className='para light'> Pending Applications  </span>
        </div>
      </div>
    </div>
  )
}

export default JobApplicationStats
