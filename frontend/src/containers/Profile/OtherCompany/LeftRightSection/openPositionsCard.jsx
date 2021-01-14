import React from 'react'
import PropTypes from 'prop-types'
import JobsCard from './jobsCard'
import '../styles.scss'

export default function OpenPositionsCard({
  categoryTitle,
  jobs,
}) {
  return (
    <div className='mt-10'>
      {
        jobs.map((job) => (
          <JobsCard key={ job.job_id } categoryTitle={ categoryTitle } job={ job } />
        ))
      }
    </div>
  )
}

OpenPositionsCard.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      jobId: PropTypes.number,
      title: PropTypes.string,
    }),
  ).isRequired,
}