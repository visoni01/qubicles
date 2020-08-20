import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core'
import JobSearchBar from '../../../components/People/job/JobSearchBar'
import '../style.scss'
import Jobs from '../../../components/People/job/Jobs'
import NewJobsModal from './newJob'

const JobsPage = () => {
  const [ openJobModal, setOpenJobModal ] = useState(false)

  const toggleJobModal = useCallback(() => {
    // eslint-disable-next-line
    setOpenJobModal((openJobModal) => !openJobModal)
  }, [ setOpenJobModal ])

  return (
    <>
      <div className='forum-title-wrapper is-mobile'>
        {/* Search Bar */}
        <JobSearchBar />
        <Button
          variant='contained'
          className='button secondary-btn new-job-button'
          startIcon={ <FontAwesomeIcon icon={ faPlus } /> }
          onClick={ toggleJobModal }
        >
          New Job
        </Button>
        <NewJobsModal open={ openJobModal } handleClose={ toggleJobModal } />
      </div>

      <Jobs />
    </>
  )
}

export default JobsPage
