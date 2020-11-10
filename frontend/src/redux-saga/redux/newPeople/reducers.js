import talentCardsReducer from './talent/talentCards'
import agentResumeSkillsReducer from './talent/agentResumeSkills'
import newJobReducer from './job/job'
import newJobCategoriesReducer from './job/jobsPage'

const peopleReducers = {
  peopleTalentCards: talentCardsReducer,
  agentResumeSkills: agentResumeSkillsReducer,
  newJobDetails: newJobReducer,
  newJobCategories: newJobCategoriesReducer,
}

export default peopleReducers
