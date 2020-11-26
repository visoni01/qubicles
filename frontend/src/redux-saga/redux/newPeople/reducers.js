import talentCardsReducer from './talent/talentCards'
import agentResumeSkillsReducer from './talent/agentResumeSkills'
import newJobReducer from './job/job'
import newJobCategoriesReducer from './job/jobsPage'
import jobPostCompanyDetailsReducer from './job/jobPostCompanyDetails'
import jobSkillsReducer from './jobSkills'
import agentResumeReducer from './talent/agentResume'
import talentFilterReducer from './talent/talentFilter'

const peopleReducers = {
  jobSkills: jobSkillsReducer,
  peopleTalentCards: talentCardsReducer,
  agentResumeSkills: agentResumeSkillsReducer,
  newJobDetails: newJobReducer,
  newJobCategories: newJobCategoriesReducer,
  jobPostCompanyDetails: jobPostCompanyDetailsReducer,
  agentResume: agentResumeReducer,
  talentFilter: talentFilterReducer,
}

export default peopleReducers
