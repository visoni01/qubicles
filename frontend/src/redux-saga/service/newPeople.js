import apiClient from '../../utils/apiClient'
import { agentResumeSkills } from '../../containers/NewPeople/ContactCenter/Talent/Application/testData'

class NewPeople {
  // Talent Api's
  static async getTalentCards({ requiredSkills, filter }) {
    // WIP Add Talent cards backend getter api
    const response = await apiClient.getRequest('/newPeople/talent/cards', null,
      {
        requiredSkills: JSON.stringify(requiredSkills),
        filter,
      })
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

  static async getJobSkills() {
    const response = await apiClient.getRequest('/newPeople/skills')
    return response
  }
}

export default NewPeople
