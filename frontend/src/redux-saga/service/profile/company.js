import apiClient from '../../../utils/apiClient'

class CompanyProfile {
  static async fetchCompanyProfileSettings() {
    const response = await apiClient.getRequest('/profile/company/settings')
    return response
  }

  static async updateCompanyProfileSettings(payload) {
    const response = await apiClient.putRequest('/profile/company/settings', payload)
    return response
  }

  static async fetchCompanyDetails({ clientId }) {
    const response = await apiClient.getRequest(`/profile/company/${ clientId }`)
    return response
  }

  static async fetchCompanyRatings({ clientId }) {
    const response = await apiClient.getRequest(`/profile/company/${ clientId }/ratings`)
    return response
  }

  static async postCompanyReview({ clientId, reviewData }) {
    const response = await apiClient.postRequest(`/profile/company/${ clientId }/reviews`, { reviewData })
    return response
  }

  static async fetchCompanyReviews({ clientId, type }) {
    const response = await apiClient.getRequest(`/profile/company/${ clientId }/reviews`, null, { type })
    return response
  }

  // WIP: Will move to agent Profile Service
  static async fetchAgentRatings({ agentUserId }) {
    const response = await apiClient.getRequest(`/profile/agent/${ agentUserId }/ratings`)
    return response
  }

  // WIP: Will move to agent Profile Service
  static async postAgentReview({ agentUserId, reviewData }) {
    const response = await apiClient.postRequest(`/profile/agent/${ agentUserId }/reviews`, { reviewData })
    return response
  }

  // WIP: Will move to agent Profile Service
  static async fetchAgentReviews({ agentUserId, type }) {
    const response = await apiClient.getRequest(`/profile/agent/${ agentUserId }/reviews`, null, { type })
    return response
  }
}

export default CompanyProfile
