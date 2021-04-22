import peopleTalentCards from './talent/talentCards'
import peopleAgentResumeSkills from './talent/agentResumeSkills'
import crudJob from './job/crud'
import jobDetails from './job/job'
import jobsByCategory from './job/jobsByCategory'
import jobSkills from './jobSkills'
import agentResume from './talent/agentResume'
import jobCategoriesOnly from './job/jobCategoriesOnly'
import fetchAgentJobs from './agent/job/fetchJobs'
import fetchTopCompanies from './agent/job/fetchTopCompanies'
import jobApplication from './application/jobApplication'
import jobApplicationList from './application/jobApplicationList'
import agentJobApplications from './application/agentJobApplications'
import fetchAgentTopData from './talent/fetchAgentTopData'

const peopleWatcherFunctions = [
  () => peopleTalentCards(),
  () => peopleAgentResumeSkills(),
  () => crudJob(),
  () => jobDetails(),
  () => jobsByCategory(),
  () => jobSkills(),
  () => agentResume(),
  () => jobCategoriesOnly(),
  () => fetchAgentJobs(),
  () => fetchTopCompanies(),
  () => jobApplication(),
  () => jobApplicationList(),
  () => agentJobApplications(),
  () => fetchAgentTopData(),
]

export default peopleWatcherFunctions
