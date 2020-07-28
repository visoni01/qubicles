import React from 'react'
import _ from 'lodash'
import JobDescription from './JobDescription'
import { jobCategoryValidator } from '../peopleValidator'

const JobsWrapper = ({ categoryId, categoryTitle, jobs }) => {
  const isJobs = !_.isEmpty(jobs)
  return (
    <div className='forum-container mt-10' key={ categoryId }>
      {/* Heading */}
      <div className='channel-heading'>
        <h3>{ categoryTitle }</h3>
      </div>
      {jobs.map((job) => <JobDescription { ...job } key={ job.jobId } />)}
      {!isJobs && (
        <div className='no-data-message'> No job postings in this category... </div>
      )}
    </div>
  )
}

JobsWrapper.propTypes = jobCategoryValidator

export default JobsWrapper
