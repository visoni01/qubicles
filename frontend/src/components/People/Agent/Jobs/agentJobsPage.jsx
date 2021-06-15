import React from 'react'
import AgentJobsSearch from '../../../../containers/People/Agent/Jobs/agentJobSearch'
import RenderAgentJobs from '../../../../containers/People/Agent/Jobs/renderAgentJobs'
import '../../../../containers/People/ContactCenter/styles.scss'

const AgentJobsPage = () => (
  <>
    <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
      <AgentJobsSearch />
    </div>
    <RenderAgentJobs />
  </>
)

export default AgentJobsPage
