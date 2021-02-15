import apiClient from '../../../utils/apiClient'

class CompanyProfile {
  static async fetchCompanyProfileSettings() {
    const response = await apiClient.getRequest('/profile/company/settings')
    return response
  }

  static async updateCompanyProfileSettings(payload) {
    const response = await apiClient.putRequest('/profile/company/settings/update', payload)
    return response
  }

  static async fetchCompanyDetails({ clientId }) {
    const response = await apiClient.getRequest(`/profile/company/${ clientId }`)
    return response
  }

  static async fetchCompanyReviews({ clientId, type }) {
    const response = await apiClient.getRequest(`/profile/company/reviews/${ clientId }`, null, { type })
    return response
  }

  static async postCompanyReview({ clientId, reviewData }) {
    const response = await apiClient.postRequest(`/profile/company/reviews/${ clientId }`, reviewData)
    return response
  }
}

export default CompanyProfile
