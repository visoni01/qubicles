import apiClient from '../../utils/apiClient'
import { agentResumeSkills } from '../../containers/NewPeople/ContactCenter/Talent/Application/testData'

class NewPeople {
  // Talent Api's
  static async getTalentCards(filter) {
    let talentFilter = filter
    if (talentFilter.requiredSkills) {
      talentFilter = {
        ...talentFilter,
        requiredSkills: JSON.stringify(talentFilter.requiredSkills),
      }
    }
    if (talentFilter.requiredLanguges) {
      talentFilter = {
        ...talentFilter,
        requiredLanguges: JSON.stringify(talentFilter.requiredLanguges),
      }
    }
    const response = await apiClient.getRequest('/newPeople/talent/cards', null, talentFilter)
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
