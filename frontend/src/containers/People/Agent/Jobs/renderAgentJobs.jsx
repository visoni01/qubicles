import React from 'react'
import { Box, Divider } from '@material-ui/core'
import { useSelector } from 'react-redux'
import AgentJobCard from '../../../../components/People/Agent/Jobs/agentJobCard'
import AgentJobsSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/Jobs/agentJobSkeleton'

const RenderAgentJobs = () => {
  const { agentJobsData, isLoading, success } = useSelector((state) => state.fetchAgentJobs)

  if (isLoading && !success) {
    return (
      <Box className='custom-box'>
        {/* Agent Job Loader */}
        {[ ...Array(3).keys() ].map((key, index) => (
          <div key={ key }>
            <AgentJobsSkeleton />
            {index < 2 && <Divider className='divider' />}
          </div>
        ))}
      </Box>
    )
  }

  return (
    <Box className='custom-box'>
      {agentJobsData.map((job) => (
        <AgentJobCard
          key={ job.jobId }
          job={ job }
        />
      ))}
      {((!agentJobsData) || (agentJobsData.length === 0)) && (
      <div className='mt-10 mb-10'>
        <div className='text-align-last-center'>
          <h3 className=' h3'> No jobs found! </h3>
        </div>
      </div>
      )}
    </Box>
  )
}

export default RenderAgentJobs
