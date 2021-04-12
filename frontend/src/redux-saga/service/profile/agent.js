import apiClient from '../../../utils/apiClient'

class AgentProfile {
  static async fetchAgentProfileSettings() {
    const response = await apiClient.getRequest('/profile/agent/settings')
    return response
  }

  static async updateAgentProfileSettings(settings) {
    // WIP Backend API
    // const response = await apiClient.putRequest('/profile/agent/settings', payload)
    // return response
    return { data: settings }
  }
}

export default AgentProfile
