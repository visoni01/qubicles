import React from 'react'
import AgentJobsSearch from './agentJobSearch'
import RenderAgentJobs from './renderAgentJobs'

const AgentJobsPage = () => (
  <>
    <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
      <AgentJobsSearch />
    </div>
    <RenderAgentJobs />
  </>
)

export default AgentJobsPage
