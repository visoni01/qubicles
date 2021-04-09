// import apiClient from '../../../utils/apiClient'
import { kareem } from '../../../assets/images/avatar'

const data = {
  companyName: 'Microsoft',
  profilePic: kareem,
  city: 'San Francisco',
  state: 'CA',
  title: 'Customer Service Agent',
  summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ducimus deleniti, sapiente perferendis
  aliquam sunt maiores libero pariatur cum rerum, obcaecati ipsum corporis ex, commodi laboriosam vero repellat
  maxime quo eum qui. Cumque aperiam cum quos voluptatem temporibus ratione tenetur odio amet, ex repudiandae!
  Hic perspiciat`,
  highestEducation: 'Bachelor\'s degree',
  workExperience: 3,
  hourlyRate: 10,
  preferredJob: 'employment',
  remoteJobs: true,
  onVacation: false,
  profileVisible: true,
}

class AgentProfile {
  static async fetchAgentProfileSettings() {
    // WIP Backend API
    // const response = await apiClient.getRequest('/profile/agent/settings')
    return { data }
  }

  static async updateAgentProfileSettings(settings) {
    // WIP Backend API
    // const response = await apiClient.putRequest('/profile/agent/settings/update', payload)
    // return response
    return { data: settings }
  }
}

export default AgentProfile
