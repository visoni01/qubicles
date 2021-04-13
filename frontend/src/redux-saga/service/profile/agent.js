import apiClient from '../../../utils/apiClient'

class AgentProfile {
  static async fetchAgentProfileSettings() {
    const response = await apiClient.getRequest('/profile/agent/settings')
    return response
  }

  static async updateAgentProfileSettings(settings) {
    const response = await apiClient.putRequest('/profile/agent/settings', settings)
    return response
  }
}

export default AgentProfile
