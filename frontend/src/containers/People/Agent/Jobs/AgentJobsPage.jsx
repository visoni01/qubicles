import React from 'react'
import AgentJobsSearch from './AgentJobSearch'
import RenderAgentJobs from './RenderAgentJobs'

const AgentJobsPage = () => (
  <>
    <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
      <AgentJobsSearch />
    </div>
    <RenderAgentJobs />
  </>
)

export default AgentJobsPage
