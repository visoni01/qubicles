import { talentCards } from '../../containers/NewPeople/ContactCenter/testData'
import { agentResumeSkills } from '../../containers/NewPeople/ContactCenter/Talent/Application/testData'

class NewPeople {
  // Talent Api's
  static async getTalentCards() {
    // WIP Add Talent cards backend getter api
    const response = await apiClient.getRequest('/newPeople/talent/cards')
    return response
  }

  static async getUserSkills({ candidateId }) {
    // WIP Add Talent cards backend getter api
    const response = await apiClient.getRequest(`/newPeople/skills/${ candidateId }`)
    return response
  }

  static async getAgentResumeSkills() {
    // WIP Add Agent Resume skills backend API
    const response = { agentResumeSkills }
    return response
  }
}

export default NewPeople
