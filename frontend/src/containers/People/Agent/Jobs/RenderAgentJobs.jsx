import React from 'react'
import { Box } from '@material-ui/core'
import AgentJobCard from './AgentJobCard'

export default function RenderAgentJobs() {
  return (
    <Box className='custom-box'>
      <AgentJobCard />
      <AgentJobCard />
      <AgentJobCard />
    </Box>
  )
}
