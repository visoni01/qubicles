import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import JobsWrap from '../../components/People/job/jobsWrap'
import { jobCategoriesFetchStart } from '../../redux-saga/redux/actions'

const JobsPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(jobCategoriesFetchStart())
  }, [ dispatch ])
  const { jobCategories, isLoading } = useSelector((state) => state.jobCategories)
  return (
    <>
      <div className='forum-title-wrapper is-mobile'>
        {/* Search Bar */}
        <div className='control channel-search'>
          <input type='text' className='input is-rounded' placeholder='Search Jobs...' />
          <div className='search-icon'>
            <i className='sl sl-icon-magnifier' />
          </div>
        </div>
        <Button
          variant='contained'
          className='button secondary-btn'
          startIcon={ <FontAwesomeIcon icon={ faPlus } /> }
        >
          New Job
        </Button>
      </div>
      {!isLoading
      && jobCategories.map((jobCategory) => <JobsWrap { ...jobCategory } key={ jobCategory.categoryId } />)}
    </>
  )
}

export default JobsPage
