import apiClient from '../../utils/apiClient'
import { talentCards } from '../../containers/NewPeople/ContactCenter/testData'
import { agentResumeSkills } from '../../containers/NewPeople/ContactCenter/Talent/Application/testData'

class NewPeople {
  // Talent Api's
  static async getTalentCards() {
    // WIP Add Talent cards backend getter api
    const response = { talentCards }
    return response
  }

  static async getAgentResumeSkills() {
    // WIP Add Agent Resume skills backend API
    const response = { agentResumeSkills }
    return response
  }
}

export default NewPeople
