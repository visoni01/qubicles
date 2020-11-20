import talentCardsReducer from './talent/talentCards'
import agentResumeSkillsReducer from './talent/agentResumeSkills'
import newJobReducer from './job/job'
import newJobCategoriesReducer from './job/jobsPage'
import jobPostCompanyDetailsReducer from './job/jobPostCompanyDetails'
import jobSkillsReducer from './jobSkills'

const peopleReducers = {
  jobSkills: jobSkillsReducer,
  peopleTalentCards: talentCardsReducer,
  agentResumeSkills: agentResumeSkillsReducer,
  newJobDetails: newJobReducer,
  newJobCategories: newJobCategoriesReducer,
  jobPostCompanyDetails: jobPostCompanyDetailsReducer,
}

export default peopleReducers