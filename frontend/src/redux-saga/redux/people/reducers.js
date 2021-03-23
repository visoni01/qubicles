import talentCardsReducer from './talent/talentCards'
import agentResumeSkillsReducer from './talent/agentResumeSkills'
import jobReducer from './job/job'
import jobsWithCategoriesReducer from './job/jobsPage'
import jobSkillsReducer from './jobSkills'
import agentResumeReducer from './talent/agentResume'
import talentFilterReducer from './talent/talentFilter'
import jobFilterReducer from './job/jobFilter'
import jobCategoriesOnlyReducer from './job/jobCategories'
import createJobDataReducer from './job/createJob'
import fetchAgentJobsReducer from './agent/job/getJobs'
import fetchTopCompaniesReducer from './agent/job/getTopCompanies'
import jobApplicationReducer from './application/jobApplication'
import jobApplicationListReducer from './application/jobApplicationList'
import agentJobApplicationsReducer from './application/agentJobApplications'

const peopleReducers = {
  jobSkills: jobSkillsReducer,
  peopleTalentCards: talentCardsReducer,
  agentResumeSkills: agentResumeSkillsReducer,
  jobDetails: jobReducer,
  jobsWithCategories: jobsWithCategoriesReducer,
  agentResume: agentResumeReducer,
  talentFilter: talentFilterReducer,
  jobFilter: jobFilterReducer,
  jobCategoriesOnly: jobCategoriesOnlyReducer,
  createJobData: createJobDataReducer,
  fetchAgentJobs: fetchAgentJobsReducer,
  fetchTopCompanies: fetchTopCompaniesReducer,
  jobApplication: jobApplicationReducer,
  jobApplicationList: jobApplicationListReducer,
  agentJobApplications: agentJobApplicationsReducer,
}

export default peopleReducers
