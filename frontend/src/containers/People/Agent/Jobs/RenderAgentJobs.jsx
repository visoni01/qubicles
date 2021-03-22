import React from 'react'
import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import AgentJobCard from './AgentJobCard'
import AgentJobsSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/agentJobSkeleton'

export default function RenderAgentJobs() {
  const { agentJobsData, isLoading, success } = useSelector((state) => state.fetchAgentJobs)
  if (isLoading && !success) {
    return (
      <Box className='custom-box'>
        {/* Agent Job Loader */}
        {[ ...Array(3).keys() ].map((key) => (<AgentJobsSkeleton key={ key } />))}
      </Box>
    )
  }
  return (
    <Box className='custom-box'>
      { agentJobsData.map((job) => (
        <AgentJobCard
          key={ job.JobId }
          job={ job }
        />
      ))}
      {((!agentJobsData) || (agentJobsData.length === 0)) && (
      <div className='mt-10 mb-10'>
        <div className='text-align-last-center'>
          <h3 className=' h3'>No jobs found!</h3>
        </div>
      </div>
      )}
    </Box>
  )
}
