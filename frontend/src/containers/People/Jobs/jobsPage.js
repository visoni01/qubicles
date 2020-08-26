import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core'
import JobSearchBar from '../../../components/People/job/JobSearchBar'
import '../style.scss'
import Jobs from '../../../components/People/job/Jobs'
import NewJobsModal from './newJob'

const NewJob = () => {
  const [ openJobModal, setOpenJobModal ] = useState(false)

  const toggleJobModal = useCallback(() => {
    // eslint-disable-next-line
    setOpenJobModal((openJobModal) => !openJobModal)
  }, [ setOpenJobModal ])

  return (
    <>
      <Button
        variant='contained'
        className='button secondary-btn new-job-button'
        startIcon={ <FontAwesomeIcon icon={ faPlus } /> }
        onClick={ toggleJobModal }
        classes={ { label: 'primary-button-label' } }
      >
        New Job
      </Button>
      <NewJobsModal open={ openJobModal } handleClose={ toggleJobModal } />
    </>
  )
}

const JobsPage = () => (
  <>
    <div className='forum-title-wrapper is-mobile'>
      {/* Search Bar */}
      <JobSearchBar />
      <NewJob />
    </div>
    <Jobs />
  </>
)

export default JobsPage
