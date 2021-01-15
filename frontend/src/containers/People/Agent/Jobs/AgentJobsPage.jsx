import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { jobsWithCategoriesFetchStart } from '../../../../redux-saga/redux/actions'
import JobsSearch from '../../ContactCenter/Jobs/JobsSearch'
import RenderAgentJobs from './RenderAgentJobs'

const AgentJobsPage = () => {
  const dispatch = useDispatch()
  const { selectedCategoryId, searchField, status } = useSelector((state) => state.jobsWithCategories)

  useEffect(() => {
    dispatch(jobsWithCategoriesFetchStart({
      categoryId: selectedCategoryId,
      searchKeyword: searchField,
      status,
    }))
  }, [ dispatch, selectedCategoryId, searchField, status ])

  return (
    <>
      <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
        <JobsSearch />
      </div>
      <RenderAgentJobs />
    </>
  )
}

export default AgentJobsPage
