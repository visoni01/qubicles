import React from 'react'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ROUTE_PATHS from '../../../../routes/routesPath'
import { resetJobDetails, resetJobData } from '../../../../redux-saga/redux/actions'
import JobsSearch from './JobsSearch'
import RenderJobs from './RenderJobs'

const JobsPage = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  const handleNewJob = () => {
    history.push(ROUTE_PATHS.NEW_JOB)
    dispatch(resetJobDetails())
    dispatch(resetJobData())
  }

  return (
    <>
      <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
        <JobsSearch />
        <Button
          className='search-button'
          onClick={ handleNewJob }
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          New Job
        </Button>
      </div>
      <RenderJobs />
    </>
  )
}

export default JobsPage
