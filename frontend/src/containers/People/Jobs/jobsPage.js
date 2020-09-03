import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core'
import JobSearchBar from '../../../components/People/job/JobSearchBar'
import '../style.scss'
import Jobs from './Jobs'
import NewJobsModal from './jobModal'

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
        // className='custom-button-primary'
        classes={ { label: 'custom-button-label-hover' } }
        className='button secondary-btn new-job-button custom-button-primary'
        startIcon={ <FontAwesomeIcon icon={ faPlus } className='icon-hover' /> }
        onClick={ toggleJobModal }
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
