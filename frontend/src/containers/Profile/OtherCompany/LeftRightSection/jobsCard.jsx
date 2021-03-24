import React, { useState, useCallback } from 'react'
import { Button, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import JobPostModal from '../About/jobPostModal'

const JobsCard = ({
  categoryTitle,
  job,
}) => {
  const [ currentJobId, setCurrentJobId ] = useState(null)

  const [ openJobPostModal, setOpenJobPostModal ] = useState(false)
  const handleOpenJobPostModal = useCallback(
    (jobId) => {
      setOpenJobPostModal((currentState) => !currentState)
      if (!openJobPostModal) {
        setCurrentJobId(jobId)
      }
    }, [ openJobPostModal ],
  )

  return (
    <>
      <div className='right-section-open-position is-fullwidth'>
        <h4 className='h4'>
          {job.title }
        </h4>
        <p className='para light'>
          {categoryTitle }
        </p>
        <Button
          classes={ {
            root: 'button-primary-text view-job-post-button',
            label: 'button-primary-text-label',
          } }
          onClick={ () => handleOpenJobPostModal(job.job_id) }
        >
          View Job Post
        </Button>
        <Divider className='divider jobsCard-divider' />
      </div>
      <div>
        <JobPostModal
          open={ openJobPostModal }
          handleClose={ handleOpenJobPostModal }
          jobId={ currentJobId }
        />
      </div>
    </>
  )
}

JobsCard.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
  job: PropTypes.shape({
    job_id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
}

export default JobsCard
