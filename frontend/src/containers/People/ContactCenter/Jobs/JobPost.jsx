import React, { useEffect } from 'react'
import {
  Box, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './styles.scss'
import { JOB_ROUTE } from '../../../../routes/routesPath'
import { getTimeFromNow } from '../../../../utils/common'
import JobsApplication from './JobApplication'
import JobPostSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/JobPostSkeleton'
import JobPostDetails from '../../../../components/People/ContactCenter/Jobs/JobPostDetails'
import { resetJobApplicationListFlags } from '../../../../redux-saga/redux/actions'

const JobPost = ({
  jobId, courses, jobDetails, isLoading,
}) => {
  const { userDetails } = useSelector((state) => state.login)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetJobApplicationListFlags())
  }, [ dispatch ])

  if (isLoading) {
    return (
      <JobPostSkeleton />
    )
  }

  return (
    <>
      <Box className='custom-box job-post-root'>
        <div className='display-inline-flex is-fullwidth'>
          <h3 className='h3 job-post-heading'>
            {jobDetails.title}
          </h3>

          { userDetails.user_id === jobDetails.jobPostOwnerId && (
          <Button
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
            onClick={ () => history.push(`${ JOB_ROUTE }/${ jobId }/edit`) }
          >
            Edit Post
          </Button>
          )}

        </div>
        <p className='para light'>
          Posted
          {' '}
          {getTimeFromNow(jobDetails.createdOn)}
        </p>

        <JobPostDetails
          courses={ courses }
          jobDetails={ jobDetails }
          isLoading={ isLoading }
        />
      </Box>

      {userDetails && userDetails.user_code === 'employer' && (
      <JobsApplication
        jobId={ jobId }
      />
      ) }
    </>
  )
}

JobPost.propTypes = {
  jobId: PropTypes.number.isRequired,
  jobDetails: PropTypes.shape(PropTypes.any).isRequired,
  courses: PropTypes.shape(PropTypes.any).isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default JobPost
