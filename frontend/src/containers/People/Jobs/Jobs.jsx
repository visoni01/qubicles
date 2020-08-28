import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import JobsWrap from '../../../components/People/job/jobsWrap'
import { jobCategoriesFetchStart } from '../../../redux-saga/redux/actions'
import Loader from '../../../components/loaders/circularLoader'
import '../style.scss'

const Jobs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(jobCategoriesFetchStart({ searchKeyword: '' }))
  }, [ dispatch ])
  const { jobCategories, isLoading } = useSelector((state) => state.jobCategories)
  return (
    <>
      { !isLoading
        ? jobCategories.map((jobCategory) => <JobsWrap { ...jobCategory } key={ jobCategory.categoryId } />)
        : (
          <Loader
            className='loader-custom'
            enableOverlay={ false }
            displayLoaderManually
          />
        )}
    </>
  )
}

export default Jobs
