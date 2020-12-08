import apiClient from '../../../utils/apiClient'

class CompanyProfile {
  static async fetchCompanyProfileSettings() {
    const response = await apiClient.getRequest('/profile/company/settings')
    return response
  }

  static async updateCompanyTitleSummary(data) {
    const response = await apiClient.postRequest('/user/edit', { ...data })
    return response
  }
}

export default CompanyProfile
