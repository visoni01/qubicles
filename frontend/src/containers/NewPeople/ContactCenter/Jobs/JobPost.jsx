import React from 'react'
import {
  Box, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './styles.scss'
import { JOB_ROUTE } from '../../../../routes/routesPath'
import { getTimeFromNow } from '../../../../utils/common'
import JobsApplication from './JobApplication'
import JobPostSkeleton from '../SkeletonLoader/JobPostSkeleton'
import JobPostDetails from './JobPostDetails'

const JobPost = ({
  jobId, courses, jobDetails, isLoading, isPreview,
}) => {
  const { userDetails } = useSelector((state) => state.login)
  const history = useHistory()

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

      <JobsApplication />
    </>
  )
}

JobPost.defaultProps = {
  isPreview: false,
}

JobPost.propTypes = {
  jobId: PropTypes.string.isRequired,
  jobDetails: PropTypes.shape(PropTypes.any).isRequired,
  courses: PropTypes.shape(PropTypes.any).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isPreview: PropTypes.bool,
}

export default JobPost
