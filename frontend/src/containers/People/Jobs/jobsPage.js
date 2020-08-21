import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core'
import JobSearchBar from '../../../components/People/job/JobSearchBar'
import '../style.scss'
import Jobs from '../../../components/People/job/Jobs'
import NewJobsModal from './newJob'

const JobsPage = () => (
  <>
    <div className='forum-title-wrapper is-mobile'>
      {/* Search Bar */}
      <JobSearchBar />
      <Button
        variant='contained'
        className='button secondary-btn new-job-button'
        startIcon={ <FontAwesomeIcon icon={ faPlus } /> }
      >
        Job Category
      </Button>
    </div>
    <Jobs />
  </>
)

export default JobsPage
