import React from 'react'
import JobDescription from '../../components/CommunicationForums/ForumChannel'
import jobsData from './data'

const Wrap = () => (
  jobsData.map(({ title, jobs }) => (
    <div className='forum-container mt-10' key={ title }>
      {/* Heading */}
      <div className='channel-heading'>
        <h3>{ title }</h3>
      </div>
      {/* Jobs */}
      {jobs.map((job) => (
        <JobDescription
          { ...job }
          jobsWrap
          key={ `${ job.id }-${ job.description }` }
        />
      ))}
    </div>
  )))

export default Wrap
