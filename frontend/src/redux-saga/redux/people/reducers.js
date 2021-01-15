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
}

export default peopleReducers
